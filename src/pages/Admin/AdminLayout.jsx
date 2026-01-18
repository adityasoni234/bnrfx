import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import '../../styles/Admin/AdminLayout.css';
import { api } from '../../services/api';

function AdminLayout({ children }) {
  const [isSyncing, setIsSyncing] = useState(true);

  useEffect(() => {
    // Sync user's MT5 accounts when layout loads or page refreshes
    const syncUserAccounts = async () => {
      try {
        const userStr = localStorage.getItem('user');
        if (userStr) {
          const user = JSON.parse(userStr);
          console.log(`🔄 Syncing MT5 accounts for user: ${user.id}`);
          
          try {
            const syncResult = await api.syncUserAccounts(user.id);
            console.log('✅ MT5 accounts synced:', syncResult);
          } catch (syncError) {
            console.warn('⚠️ Failed to sync MT5 accounts:', syncError);
          } finally {
            setIsSyncing(false);
          }
        } else {
          setIsSyncing(false);
        }
      } catch (error) {
        console.warn('⚠️ Error initiating MT5 sync:', error);
        setIsSyncing(false);
      }
    };

    syncUserAccounts();
  }, []);

  if (isSyncing) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1a1a2e',
        color: '#fff',
        zIndex: 9999
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          border: '5px solid #333',
          borderTop: '5px solid #4CAF50',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <p style={{ marginTop: '20px', fontSize: '16px' }}>Syncing MT5 accounts...</p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;