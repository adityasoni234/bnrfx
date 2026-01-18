"""
MT5 to Supabase Sync Service
Handles synchronization of MT5 account data to Supabase database.
"""

import logging
import time
from datetime import datetime
from typing import Dict, List, Optional, Any
from supabase_client import get_supabase_client

logger = logging.getLogger(__name__)


def get_account_info(login: int) -> Optional[Dict[str, Any]]:
    """
    Fetch account info from MT5 Manager Bridge via HTTP.
    """
    try:
        import requests
        
        print(f"Fetching account {login} from MT5...")
        response = requests.get(f"http://127.0.0.1:5001/account/{login}", timeout=30)
        
        if response.status_code == 200:
            data = response.json()
            if data.get('success'):
                account = data.get('data', {})
                # Map bridge response to expected format
                return {
                    'balance': account.get('balance', 0),
                    'equity': account.get('equity', 0),
                    'margin': account.get('margin', 0),
                    'free_margin': account.get('margin_free', 0),
                    'profit': account.get('equity', 0) - account.get('balance', 0),
                    'currency': 'USD'
                }
        
        print(f"⚠️ Account {login} not found in MT5")
        return None
        
    except Exception as e:
        print(f"❌ Error fetching account {login} from bridge: {str(e)}")
        return None


def sync_mt5_account(login: int) -> Dict[str, Any]:
    """
    Sync a single MT5 account to Supabase.
    
    Fetches live account data from MT5 Manager API and updates the mt5_accounts
    table in Supabase with current account information.
    
    Args:
        login: MT5 account login number
        
    Returns:
        Dict containing sync result with keys:
            - success: bool
            - login: int
            - message: str
            - error: Optional[str]
    """
    try:
        print(f"🔄 Starting sync for MT5 account: {login}")
        
        # Fetch account data from MT5
        account_data = get_account_info(login)
        
        supabase = get_supabase_client()
        
        if account_data is None:
            # Account not found in MT5
            print(f"⚠️ MT5 account {login} not found")
            
            # Don't mark as inactive - just skip this sync
            return {
                'success': False,
                'login': login,
                'message': 'Account not found in MT5',
                'error': 'Account not found'
            }
        
        # Extract account information
        update_data = {
            'balance': account_data.get('balance', 0),
            'equity': account_data.get('equity', 0),
            'margin': account_data.get('margin', 0),
            'free_margin': account_data.get('free_margin', 0),
            'currency': account_data.get('currency', 'USD'),
            'is_active': True,
            'updated_at': datetime.utcnow().isoformat()
        }
        
        # Update account in Supabase
        result = supabase.table('mt5_accounts').update(update_data).eq('login_id', str(login)).execute()
        
        if result.data:
            print(f"✅ Successfully synced MT5 account {login}: balance={update_data['balance']}, equity={update_data['equity']}")
            return {
                'success': True,
                'login': login,
                'message': 'Account synced successfully',
                'data': update_data
            }
        else:
            print(f"⚠️ No rows updated for login {login} - account may not exist in database")
            return {
                'success': False,
                'login': login,
                'message': 'Account not found in database',
                'error': 'No matching record in mt5_accounts table'
            }
            
    except Exception as e:
        print(f"❌ Error syncing MT5 account {login}: {str(e)}")
        
        # Try to update error status in database
        try:
            supabase = get_supabase_client()
            supabase.table('mt5_accounts').update({
                'updated_at': datetime.utcnow().isoformat()
            }).eq('login_id', str(login)).execute()
        except Exception as db_error:
            print(f"❌ Failed to update error status for login {login}: {str(db_error)}")
        
        return {
            'success': False,
            'login': login,
            'message': 'Sync failed',
            'error': str(e)
        }


def sync_all_accounts(delay_between_requests: float = 3.0) -> Dict[str, Any]:
    """
    Sync all active MT5 accounts from Supabase.
    
    Fetches all active MT5 accounts from the database and syncs them sequentially
    with a delay between requests to avoid MT5 rate limits and prevent blocking frontend requests.
    
    Args:
        delay_between_requests: Delay in seconds between syncing each account (default: 3.0s)
        
    Returns:
        Dict containing sync summary with keys:
            - total: int - Total accounts processed
            - successful: int - Successfully synced accounts
            - failed: int - Failed syncs
            - results: List[Dict] - Individual sync results
            - duration: float - Total sync duration in seconds
    """
    start_time = time.time()
    
    try:
        print("\n📊 Starting sync_all_accounts()")
        
        supabase = get_supabase_client()
        print("🔍 Fetching active MT5 accounts from Supabase...")
        
        # Test connection and table existence
        try:
            test_query = supabase.table('mt5_accounts').select('*').limit(1).execute()
            print(f"   Connection test: {'✅ OK' if test_query else '❌ Failed'}")
        except Exception as test_error:
            print(f"   Connection test error: {test_error}")
        
        # First, check all accounts regardless of is_active
        all_accounts = supabase.table('mt5_accounts').select('login_id, is_active').execute()
        print(f"📋 Total accounts in DB: {len(all_accounts.data) if all_accounts.data else 0}")
        if all_accounts.data:
            print(f"   Sample accounts: {all_accounts.data[:3]}")
        
        # Fetch all active MT5 accounts
        response = supabase.table('mt5_accounts').select('login_id').eq('is_active', True).execute()
        
        print(f"📦 Response data: {response.data}")
        print(f"📊 Response count: {getattr(response, 'count', 'N/A')}")
        
        if not response.data:
            print("ℹ️ No active MT5 accounts found to sync")
            return {
                'total': 0,
                'successful': 0,
                'failed': 0,
                'results': [],
                'duration': time.time() - start_time
            }
        
        accounts = response.data
        total_accounts = len(accounts)
        print(f"📋 Found {total_accounts} active MT5 accounts to sync")
        
        results = []
        successful = 0
        failed = 0
        
        # Sync accounts sequentially with delay
        for index, account in enumerate(accounts, 1):
            login = int(account['login_id'])
            
            print(f"   [{index}/{total_accounts}] Syncing account: {login}")
            
            # Sync the account
            result = sync_mt5_account(login)
            results.append(result)
            
            if result['success']:
                successful += 1
            else:
                failed += 1
            
            # Add delay between requests (except after last account)
            if index < total_accounts:
                time.sleep(delay_between_requests)
        
        duration = time.time() - start_time
        
        summary = {
            'total': total_accounts,
            'successful': successful,
            'failed': failed,
            'results': results,
            'duration': round(duration, 2)
        }
        
        print(
            f"\n✅ Sync completed: {successful}/{total_accounts} successful, "
            f"{failed} failed, duration: {duration:.2f}s\n"
        )
        
        return summary
        
    except Exception as e:
        duration = time.time() - start_time
        print(f"\n❌ Error in sync_all_accounts: {str(e)}\n")
        
        return {
            'total': 0,
            'successful': 0,
            'failed': 0,
            'results': [],
            'error': str(e),
            'duration': round(duration, 2)
        }


def get_sync_status() -> Dict[str, Any]:
    """
    Get current sync status and statistics from Supabase.
    
    Returns:
        Dict containing:
            - total_accounts: int
            - active_accounts: int
            - inactive_accounts: int
            - accounts_with_errors: int
    """
    try:
        supabase = get_supabase_client()
        
        # Get total accounts
        total_response = supabase.table('mt5_accounts').select('login_id', count='exact').execute()
        total_accounts = total_response.count or 0
        
        # Get active accounts
        active_response = supabase.table('mt5_accounts').select('login_id', count='exact').eq('is_active', True).execute()
        active_accounts = active_response.count or 0
        
        # Get inactive accounts
        inactive_accounts = total_accounts - active_accounts
        
        return {
            'total_accounts': total_accounts,
            'active_accounts': active_accounts,
            'inactive_accounts': inactive_accounts
        }
        
    except Exception as e:
        print(f"❌ Error getting sync status: {str(e)}")
        return {
            'error': str(e),
            'total_accounts': 0,
            'active_accounts': 0,
            'inactive_accounts': 0
        }
