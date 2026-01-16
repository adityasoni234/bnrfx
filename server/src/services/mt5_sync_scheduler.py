"""
MT5 Sync Scheduler and API Routes
Provides Flask routes and automated scheduling for MT5 → Supabase synchronization.
"""

import logging
from flask import Blueprint, jsonify, request
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.interval import IntervalTrigger
from datetime import datetime
import atexit

from sync import sync_all_accounts, sync_mt5_account, get_sync_status

logger = logging.getLogger(__name__)

# Create Flask Blueprint
mt5_sync_bp = Blueprint('mt5_sync', __name__, url_prefix='/api/mt5')

# Initialize scheduler
scheduler = BackgroundScheduler()
scheduler.start()

# Store last sync information
last_sync_info = {
    'timestamp': None,
    'status': 'Not started',
    'summary': None
}


def scheduled_sync_job():
    """
    Job function that runs on schedule to sync all MT5 accounts.
    """
    try:
        print(f"\n{'='*60}")
        print(f"⏰ SCHEDULED SYNC JOB TRIGGERED at {datetime.utcnow().isoformat()}")
        print(f"{'='*60}")
        print("Starting scheduled MT5 sync job...")
        
        summary = sync_all_accounts()
        
        last_sync_info['timestamp'] = datetime.utcnow().isoformat()
        last_sync_info['status'] = 'completed'
        last_sync_info['summary'] = summary
        
        print(f"✅ Scheduled sync completed: {summary['successful']}/{summary['total']} successful")
        print(f"{'='*60}\n")
        
    except Exception as e:
        print(f"\n❌ ERROR in scheduled sync job: {str(e)}")
        print(f"{'='*60}\n")
        last_sync_info['timestamp'] = datetime.utcnow().isoformat()
        last_sync_info['status'] = 'failed'
        last_sync_info['summary'] = {'error': str(e)}


# Add scheduled job - runs every 2 minutes
scheduler.add_job(
    func=scheduled_sync_job,
    trigger=IntervalTrigger(minutes=10),
    id='mt5_sync_job',
    name='Sync MT5 accounts to Supabase',
    replace_existing=True
)

print("⏰ MT5 sync scheduler initialized - syncing every 2 minutes")
job = scheduler.get_job('mt5_sync_job')
if job and job.next_run_time:
    print(f"📅 Next sync scheduled for: {job.next_run_time}")


# Shutdown scheduler gracefully on application exit
def shutdown_scheduler():
    """Shutdown the scheduler when the application exits."""
    if scheduler.running:
        print("\n🛑 Shutting down MT5 sync scheduler")
        scheduler.shutdown()


atexit.register(shutdown_scheduler)


# Flask Routes

@mt5_sync_bp.route('/sync', methods=['POST'])
def trigger_sync():
    """
    POST /api/mt5/sync
    
    Manually trigger synchronization of all MT5 accounts.
    
    Returns:
        JSON response with sync summary
    """
    try:
        logger.info("Manual sync triggered via API")
        
        # Check if a specific login is provided
        data = request.get_json() or {}
        login = data.get('login')
        
        if login:
            # Sync single account
            result = sync_mt5_account(int(login))
            return jsonify({
                'status': 'success' if result['success'] else 'error',
                'message': f"Sync {'completed' if result['success'] else 'failed'} for account {login}",
                'result': result
            }), 200 if result['success'] else 500
        else:
            # Sync all accounts
            summary = sync_all_accounts()
            
            # Update last sync info
            last_sync_info['timestamp'] = datetime.utcnow().isoformat()
            last_sync_info['status'] = 'completed'
            last_sync_info['summary'] = summary
            
            return jsonify({
                'status': 'success',
                'message': 'Sync completed',
                'summary': summary
            }), 200
            
    except Exception as e:
        logger.error(f"Error in manual sync: {str(e)}", exc_info=True)
        return jsonify({
            'status': 'error',
            'message': 'Sync failed',
            'error': str(e)
        }), 500


@mt5_sync_bp.route('/sync/status', methods=['GET'])
def get_last_sync():
    """
    GET /api/mt5/sync/status
    
    Get information about the last sync operation.
    
    Returns:
        JSON response with last sync details
    """
    try:
        status = get_sync_status()
        
        return jsonify({
            'status': 'success',
            'last_sync': last_sync_info,
            'current_status': status
        }), 200
        
    except Exception as e:
        logger.error(f"Error getting sync status: {str(e)}", exc_info=True)
        return jsonify({
            'status': 'error',
            'message': 'Failed to get sync status',
            'error': str(e)
        }), 500


@mt5_sync_bp.route('/sync/schedule', methods=['GET'])
def get_schedule_info():
    """
    GET /api/mt5/sync/schedule
    
    Get information about the scheduled sync job.
    
    Returns:
        JSON response with scheduler details
    """
    try:
        job = scheduler.get_job('mt5_sync_job')
        
        if job:
            next_run = job.next_run_time.isoformat() if job.next_run_time else None
            
            return jsonify({
                'status': 'success',
                'scheduler': {
                    'running': scheduler.running,
                    'job_id': job.id,
                    'job_name': job.name,
                    'next_run_time': next_run,
                    'interval': '2 minutes'
                }
            }), 200
        else:
            return jsonify({
                'status': 'error',
                'message': 'Sync job not found'
            }), 404
            
    except Exception as e:
        logger.error(f"Error getting schedule info: {str(e)}", exc_info=True)
        return jsonify({
            'status': 'error',
            'message': 'Failed to get schedule info',
            'error': str(e)
        }), 500


def init_sync_scheduler(app):
    """
    Initialize the sync scheduler and register routes with Flask app.
    
    Args:
        app: Flask application instance
    """
    # Register the blueprint with the app
    app.register_blueprint(mt5_sync_bp)
    
    logger.info("MT5 sync routes registered successfully")
    
    # Run initial sync on startup (optional)
    # Uncomment the following lines if you want to sync immediately on startup
    # try:
    #     logger.info("Running initial sync on startup")
    #     scheduled_sync_job()
    # except Exception as e:
    #     logger.error(f"Initial sync failed: {str(e)}")
