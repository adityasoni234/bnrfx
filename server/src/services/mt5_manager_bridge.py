from flask import Flask, request, jsonify
from flask_cors import CORS
import MT5Manager
import threading
import random
import string
import time
import logging
import os
from pathlib import Path

# Import MT5 sync system
try:
    from mt5_sync_scheduler import init_sync_scheduler
    SYNC_AVAILABLE = True
    logging.info("MT5 sync scheduler imported successfully")
except ImportError as e:
    logging.error(f"Failed to import MT5 sync scheduler: {str(e)}")
    SYNC_AVAILABLE = False
except Exception as e:
    logging.error(f"Unexpected error importing sync scheduler: {str(e)}")
    SYNC_AVAILABLE = False

app = Flask(__name__)
CORS(app)

# MT5_SERVER = "91.243.176.38:443"
# MT5_MANAGER = 7000
# MT5_PASSWORD = "Raja@123"
# ===== MT5 CONNECTION CONFIG (DEFAULT / FALLBACK) =====
MT5_CONFIG = {
    "server": "91.243.176.38:443",
    # "manager": 7000,
    "manager": 34000,
    # "password": "Raja@123"
    "password": "Stvala@123"
}

manager = MT5Manager.ManagerAPI()
lock = threading.Lock()

def generate_password(length=8):
    """Generate random password for trading account"""
    symbols = "!@#$%^&*"
    while True:
        pwd = ''.join(random.choice(string.ascii_letters + string.digits + symbols) for _ in range(length))
        if (any(c.isdigit() for c in pwd) and
            any(c.islower() for c in pwd) and
            any(c.isupper() for c in pwd) and
            any(c in symbols for c in pwd)):
            return pwd
        
def dump_mt5_user(user):
    for attr in dir(user):
        if not attr.startswith("_"):
            try:
                value = getattr(user, attr)
                if not callable(value):
                    print(f"{attr}: {value}")
            except:
                pass

def connect(pump=0):
    with lock:
        print(f"🔌 Connecting to MT5 Server {MT5_CONFIG['server']} as Manager {MT5_CONFIG['manager']}...")
        return manager.Connect(
            MT5_CONFIG["server"],
            MT5_CONFIG["manager"],
            MT5_CONFIG["password"],
            MT5Manager.ManagerAPI.EnPumpModes.PUMP_MODE_FULL,
            120000
        )

def disconnect():
    with lock:
        manager.Disconnect()

def fetch_account_from_mt5(login: int):
    """
    Fetch account info from MT5 server (shared function).
    Returns dict with account data or None if not found.
    """
    if not connect():
        raise Exception(f"Failed to connect to MT5: {MT5Manager.LastError()}")
    
    with lock:
        try:
            user = manager.UserRequest(login)
            if not user:
                return None
            
            account = manager.UserAccountGet(login)
            
            if account:
                margin_level = 0
                if hasattr(account, 'Margin') and account.Margin > 0:
                    margin_level = (account.Equity / account.Margin) * 100
                
                account_info = {
                    "login": user.Login,
                    "name": f"{user.FirstName} {user.LastName}",
                    "email": user.EMail if hasattr(user, 'EMail') else "",
                    "group": user.Group,
                    "leverage": user.Leverage,
                    "balance": account.Balance if hasattr(account, 'Balance') else user.Balance,
                    "credit": account.Credit if hasattr(account, 'Credit') else user.Credit,
                    "equity": account.Equity if hasattr(account, 'Equity') else user.Balance + user.Credit,
                    "margin": account.Margin if hasattr(account, 'Margin') else 0,
                    "margin_free": account.MarginFree if hasattr(account, 'MarginFree') else account.Equity if hasattr(account, 'Equity') else user.Balance,
                    "margin_level": margin_level,
                    "enabled": user.Rights == 3 or user.Rights == 11,
                    "registration": user.Registration,
                    "last_access": user.LastAccess if hasattr(user, 'LastAccess') else 0
                }
            else:
                account_info = {
                    "login": user.Login,
                    "name": f"{user.FirstName} {user.LastName}",
                    "email": user.EMail if hasattr(user, 'EMail') else "",
                    "group": user.Group,
                    "leverage": user.Leverage,
                    "balance": user.Balance,
                    "credit": user.Credit,
                    "equity": user.Balance + user.Credit,
                    "margin": 0,
                    "margin_free": user.Balance + user.Credit,
                    "margin_level": 0,
                    "enabled": user.Rights == 3 or user.Rights == 11,
                    "registration": user.Registration,
                    "last_access": user.LastAccess if hasattr(user, 'LastAccess') else 0
                }
            
            return account_info
        except Exception as e:
            raise e

@app.route("/connect", methods=["POST"])
def api_connect():
    if connect():
        return jsonify(success=True)
    return jsonify(success=False, error=MT5Manager.LastError()), 500

@app.route("/disconnect", methods=["POST"])
def api_disconnect():
    disconnect()
    return jsonify(success=True)

@app.route("/config/mt5", methods=["POST"])
def update_mt5_config():
    print("🔧 Updating MT5 configuration...")
    data = request.json or {}
    print(f"Received config data: {data}")
    # Overwrite only if provided
    if "server" in data:
        MT5_CONFIG["server"] = data["server"]

    if "manager" in data:
        MT5_CONFIG["manager"] = int(data["manager"])

    if "password" in data:
        MT5_CONFIG["password"] = data["password"]
    print(f"Updated MT5_CONFIG: {MT5_CONFIG}")
    return jsonify(
        success=True,
        message="MT5 credentials updated",
        current_config={
            "server": MT5_CONFIG["server"],
            "manager": MT5_CONFIG["manager"],
            "password": "******"  # hide password
        }
    )


@app.route("/users", methods=["GET"])
def list_users():
    if not connect():
        return jsonify(error=MT5Manager.LastError()), 500

    users = []
    total = manager.UserRequest()
    
    if total > 0:
        for i in range(total):
            user = manager.UserNext(i)
            if user:
                users.append({
                    "login": user.Login,
                    "group": user.Group,
                    "name": f"{user.FirstName} {user.LastName}",
                    "email": user.Email,
                    "leverage": user.Leverage,
                    "balance": user.Balance,
                    "credit": user.Credit,
                    "enabled": user.Enable == 1,
                    "registration": user.Registration
                })
    
    disconnect()
    return jsonify(success=True, users=users, total=total)

@app.route("/users", methods=["POST"])
def create_user():
    """Create new MT5 trading account"""
    data = request.json
    print(data)
    if not connect():
        return jsonify(error=MT5Manager.LastError()), 500
      
    try:
        print("Creating user...")
        user = MT5Manager.MTUser(manager)
         # 1. Retrieve all users for that group
        total_groups = manager.GroupTotal()
        print(f"Total groups found on server: {total_groups}")
        target_group_mask = data.get("group", "IND\\3001\\COMEX\\7001\\10 USD-demo10lot") + "*"
        users_list = manager.UserGetByGroup(target_group_mask)
        print(f"Users in group: {[u.Login for u in users_list]}")
        if users_list and len(users_list) > 0:
            # 2. Sort the users list by 'RegDate' in descending order (newest first)
            # The 'RegDate' is a timestamp (seconds since epoch)
            users_list.sort(key=lambda user: user.Registration, reverse=True)
            last_user = users_list[0]
        
        print(f"Last user in group: {last_user.Login if users_list else 'None'}")
        user.Login = last_user.Login + 1 if users_list else 1   
        user.Group = data.get("group", "IND\\3001\\COMEX\\7001\\10 USD-demo10lot")
        user.Leverage = data.get("leverage", 100)
        user.FirstName = data.get("first_name", "")
        user.LastName = data.get("last_name", "")
        user.Rights = 11
        # Generate passwords
        trading_password = data.get("password") or generate_password(10)
        investor_password = data.get("investor_password") or generate_password(10)
        print(f"Generated passwords: {trading_password}, {investor_password}")
       
        # Create user
        if not manager.UserAdd(user, trading_password, investor_password):
            print("User creation failed:", MT5Manager.LastError())
            disconnect()
            return jsonify(success=False, error=MT5Manager.LastError()), 400
        print(f"User created with login: {user.Login}")
        # Apply initial balance if provided
        # initial_balance = data.get("initial_balance", 0)
        # if initial_balance > 0:
        deal = manager.DealerBalance(
                user.Login,
                float(0),
                MT5Manager.MTDeal.EnDealAction.DEAL_BALANCE,
                "Initial Balance"
            )
        
        disconnect()
        return jsonify(
            success=True,
            login=user.Login,
            trading_password=trading_password,
            investor_password=investor_password,
            group=user.Group,
            leverage=user.Leverage
        )
    except Exception as e:
        disconnect()
        print(f"Error creating user: {str(e)}")
        return jsonify(success=False, error=str(e)), 500

@app.route("/account/<int:login>", methods=["GET"])
def get_account_info(login):
    """Get account balance and details"""
    print(f"Fetching account info for login: {login}")
    try:
        account_info = fetch_account_from_mt5(login)
        
        if not account_info:
            return jsonify(success=False, error="Account not found"), 404
        
        return jsonify(success=True, data=account_info)
    except Exception as e:
        print(f"❌ Exception: {str(e)}")
        return jsonify(success=False, error=str(e)), 500

@app.route("/balance/deposit", methods=["POST"])
def deposit():
    """Add funds to MT5 account as CREDIT"""
    data = request.json

    if not connect():
        return jsonify(error=MT5Manager.LastError()), 500

    try:
        login = int(data["login"])
        amount = float(data["amount"])
        comment = data.get("comment", "Credit Deposit")
        
        # Perform Credit Deposit
        # Use EnDealAction.DEAL_CREDIT instead of DEAL_BALANCE
        deal = manager.DealerBalance(
            login,
            amount,
            MT5Manager.MTDeal.EnDealAction.DEAL_BALANCE,
            comment
        )

        if deal is False:
            disconnect()
            return jsonify(success=False, error=MT5Manager.LastError()), 400
        
        # Get updated account info
        user = manager.UserRequest(login)
        # In credit operations, we track user.Credit
        new_credit = user.Credit if user else 0

        disconnect()
        return jsonify(
            success=True, 
            deal_id=deal,
            login=login,
            amount=amount,
            new_credit=new_credit,
            comment=comment
        )
    except Exception as e:
        disconnect()
        return jsonify(success=False, error=str(e)), 500

@app.route("/balance/withdraw", methods=["POST"])
def withdraw():
    """Remove funds from MT5 account based on EQUITY"""
    data = request.json

    if not connect():
        return jsonify(error=MT5Manager.LastError()), 500

    try:
        login = int(data["login"])
        amount = float(data["amount"])
        comment = data.get("comment", "Withdrawal")
        
        # Get account state to check Equity
        user = manager.UserAccountGet(login) # AccountGet provides real-time Equity
        if not user:
            disconnect()
            return jsonify(success=False, error="Account not found"), 404
        
        # Validate against Equity (Balance + Floating P/L)
        if user.Equity < amount:
            disconnect()
            return jsonify(
                success=False, 
                error="Insufficient Equity", 
                available_equity=user.Equity
            ), 400
        
        # Perform withdrawal from Balance
        deal = manager.DealerBalance(
            login,
            -amount,
            MT5Manager.MTDeal.EnDealAction.DEAL_BALANCE,
            comment
        )

        if deal is False:
            disconnect()
            return jsonify(success=False, error=MT5Manager.LastError()), 400
        
        # Get updated stats
        updated_user = manager.UserAccountGet(login)
        new_balance = updated_user.Balance if updated_user else 0

        disconnect()
        return jsonify(
            success=True, 
            deal_id=deal,
            login=login,
            amount=amount,
            new_balance=new_balance,
            remaining_equity=updated_user.Equity if updated_user else 0,
            comment=comment
        )
    except Exception as e:
        disconnect()
        return jsonify(success=False, error=str(e)), 500

@app.route("/positions", methods=["GET"])
def get_positions():
    """Retrieve all open positions for all users"""
    print("=" * 50)
    print("🔍 GET /positions endpoint called")
    print("=" * 50)
    
    if not connect():
        print("❌ Failed to connect to MT5")
        return jsonify(error=MT5Manager.LastError()), 500

    try:
        # Get all open positions across all users
        print("📊 Fetching all open positions...")
        positions_list = manager.PositionGetByGroup("*")
        print(f"✅ Retrieved positions_list, type: {type(positions_list)}")

        if positions_list is False:
            print("❌ PositionGetByGroup returned False")
            disconnect()
            return jsonify(success=False, error=MT5Manager.LastError()), 400
        
        if not positions_list:
            print("⚠️ No open positions found")
            disconnect()
            return jsonify(success=True, positions=[], message="No open positions found"), 200

        print(f"📈 Found {len(positions_list)} positions")
        
        dump_mt5_user(positions_list[0])

        print(f"✅ Returning {len(positions_list)} formatted positions")
        disconnect()
        return jsonify(
            success=True, 
            total_positions=len(positions_list),
            positions=positions_list
        )
    except Exception as e:
        print(f"❌ Exception in get_positions: {str(e)}")
        disconnect()
        return jsonify(success=False, error=str(e)), 500


@app.route("/positions/<int:login>", methods=["GET"])
def get_positions_by_login(login):
    if not connect():
        return jsonify(error=MT5Manager.LastError()), 500

    try:
        # Give the pump a moment to synchronize data
        time.sleep(1)

        # 1. Verify account exists
        user = manager.UserRequest(login)
        if not user:
            disconnect()
            return jsonify(success=False, error="Account not found"), 404
        
        # 2. Corrected Method: Use PositionGet with the login keyword
        positions_data = manager.PositionGet(login=login)

        if positions_data is False:
            err = MT5Manager.LastError()
            disconnect()
            return jsonify(success=False, error=f"API Error: {err}"), 400
        
        if not positions_data:
            disconnect()
            return jsonify(success=True, login=login, total_positions=0, positions=[]), 200

        # 3. Manually format the position objects for JSON serialization
        formatted_positions = []
        for pos in positions_data:
            formatted_positions.append({
                "ticket": getattr(pos, "Position", 0),
                "symbol": getattr(pos, "Symbol", ""),
                "type": "BUY" if getattr(pos, "Action", 0) == 0 else "SELL",
                "volume": getattr(pos, "Volume", 0) / 10000, # MT5 scaling
                "price_open": getattr(pos, "PriceOpen", 0.0),
                "profit": getattr(pos, "Profit", 0.0)
            })

        disconnect()
        return jsonify(
            success=True,
            login=login,
            account_name=f"{user.FirstName} {user.LastName}",
            total_positions=len(formatted_positions),
            positions=formatted_positions
        )

    except Exception as e:
        disconnect()
        return jsonify(success=False, error=str(e)), 500


@app.route("/risk/<int:login>", methods=["GET"])
def get_risk_monitor(login):
    """Get risk monitoring data for account"""
    if not connect():
        return jsonify(error=MT5Manager.LastError()), 500

    try:
        user = manager.UserRequest(login)
        if not user:
            disconnect()
            return jsonify(success=False, error="Account not found"), 404
        
        # Get open positions
        positions = []
        total_profit = 0
        total_volume = 0
        exposure_by_symbol = {}
        
        # Manager API doesn't provide direct access to trades/positions
        # This would require Server API integration
        # For now, calculate based on account data only
        
        # Calculate risk metrics
        balance = user.Balance
        equity = balance + user.Credit  # Simplified without floating P/L
        margin = user.MarginFree if hasattr(user, 'MarginFree') else 0
        free_margin = equity - margin if margin > 0 else equity
        margin_level = (equity / margin * 100) if margin > 0 else 0
        
        risk_data = {
            "login": login,
            "balance": balance,
            "equity": equity,
            "margin": margin,
            "free_margin": free_margin,
            "margin_level": margin_level,
            "total_profit": total_profit,
            "open_positions": len(positions),
            "total_lots": total_volume,
            "positions": positions,
            "exposure_by_symbol": exposure_by_symbol,
            "margin_call_level": 50,  # Configure based on group settings
            "stop_out_level": 20      # Configure based on group settings
        }
        
        disconnect()
        return jsonify(success=True, data=risk_data)
    except Exception as e:
        disconnect()
        return jsonify(success=False, error=str(e)), 500

@app.route("/ib/<int:master_login>", methods=["GET"])
def get_ib_hierarchy(master_login):
    """Get IB/Manager hierarchy and performance"""
    if not connect():
        return jsonify(error=MT5Manager.LastError()), 500

    try:
        # Get master/IB account
        master = manager.UserRequest(master_login)
        if not master:
            disconnect()
            return jsonify(success=False, error="Master account not found"), 404
        
        # Get all users under this IB
        clients = []
        total = manager.UserRequest()
        
        if total > 0:
            for i in range(total):
                user = manager.UserNext(i)
                # Check if user belongs to this IB's group or hierarchy
                # This logic depends on your group structure
                if user and (user.AgentAccount == master_login or master.Group in user.Group):
                    clients.append({
                        "login": user.Login,
                        "name": f"{user.FirstName} {user.LastName}",
                        "group": user.Group,
                        "balance": user.Balance,
                        "equity": user.Balance + user.Credit,
                        "registration": user.Registration
                    })
        
        # Calculate IB metrics
        total_volume = 0
        total_commission = 0
        
        # Get trading history for commission calculation
        # This would require additional API calls to get deals/trades
        
        ib_data = {
            "master_login": master_login,
            "master_name": f"{master.FirstName} {master.LastName}",
            "master_group": master.Group,
            "total_clients": len(clients),
            "clients": clients,
            "total_volume": total_volume,
            "total_commission": total_commission,
            "pending_rebates": 0  # Calculate based on commission rules
        }
        
        disconnect()
        return jsonify(success=True, data=ib_data)
    except Exception as e:
        disconnect()
        return jsonify(success=False, error=str(e)), 500

@app.route("/sync-user-accounts/<user_id>", methods=["POST"])
def sync_user_accounts(user_id):
    """
    Sync MT5 accounts for a specific user.
    Called when user logs in to update their account data.
    """
    try:
        from sync import sync_mt5_account
        from supabase_client import get_supabase_client
        
        print(f"🔄 Syncing MT5 accounts for user: {user_id}")
        
        # Get user's MT5 accounts from Supabase
        supabase = get_supabase_client()
        response = supabase.table('mt5_accounts')\
            .select('login_id')\
            .eq('user_id', user_id)\
            .eq('is_active', True)\
            .execute()
        
        if not response.data:
            return jsonify({
                'success': True,
                'message': 'No MT5 accounts found for this user',
                'total': 0,
                'successful': 0,
                'failed': 0
            })
        
        accounts = response.data
        print(f"📋 Found {len(accounts)} MT5 accounts for user {user_id}")
        
        results = []
        successful = 0
        failed = 0
        
        # Sync each account
        for account in accounts:
            login = int(account['login_id'])
            print(f"   Syncing account: {login}")
            
            result = sync_mt5_account(login)
            time.sleep(1.5)
            results.append(result)
            
            if result['success']:
                successful += 1
            else:
                failed += 1
        
        return jsonify({
            'success': True,
            'message': f'Synced {successful}/{len(accounts)} accounts successfully',
            'total': len(accounts),
            'successful': successful,
            'failed': failed,
            'results': results
        })
        
    except Exception as e:
        print(f"❌ Error syncing user accounts: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route("/groups", methods=["GET"])
def get_groups():
    if not connect():
        return jsonify(error=MT5Manager.LastError()), 500

    try:
        # Give the server a moment to sync group configurations
        time.sleep(1)

        total = manager.GroupTotal()
        print(f"Total groups found on server: {total}")
        
        if not total:
            disconnect()
            return jsonify(success=True, groups=[], total=0)

        groups = []
        # Use a range to fetch each specific group by its index
        for i in range(total):
            group = manager.GroupNext(i) # Fetch the group at index 'i'
            
            if group:
                print(f"Processing group {i+1}/{total}: {group.Group}")
                groups.append({
                    "name": group.Group,
                    "currency": getattr(group, "Currency", "USD"),
                    "leverage": getattr(group, "DefaultLeverage", 100)
                })
            else:
                print(f"Failed to fetch group at index {i}")

        disconnect()
        return jsonify(success=True, groups=groups, total=len(groups))

    except Exception as e:
        disconnect()
        return jsonify(success=False, error=str(e)), 500


if __name__ == "__main__":
    # Establish persistent connection when running as main script
    print("🚀 MT5 Manager Bridge Server Initializing...")
    print(f"📡 Server: {MT5_CONFIG['server']}")
    print(f"👤 Manager: {MT5_CONFIG['manager']}")
    print(f"🔐 Establishing persistent connection...")
    
    if connect():
        print("✅ Persistent connection established!")
        print("ℹ️  Connection will remain active for all requests")
    else:
        print(f"❌ Connection failed: {MT5Manager.LastError()}")
    
    print("\n🌐 Starting Flask server on https://mt5.bnrfx.com")
    app.run(port=5001, debug=True, use_reloader=False)