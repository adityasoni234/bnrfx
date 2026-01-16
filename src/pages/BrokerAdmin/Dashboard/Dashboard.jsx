import React, { useState, useEffect } from 'react';
import { 
  MdPeople, 
  MdTrendingUp, 
  MdAccountBalance,
  MdShowChart,
  MdVerifiedUser,
  MdAttachMoney,
  MdArrowDownward,
  MdArrowUpward,
  MdRefresh
} from 'react-icons/md';
import './Dashboard.css';
import { getDashboardStats } from '../../../lib/supabase/helpers';
import { supabase } from '../../../lib/supabase/client';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const dashboardStats = await getDashboardStats();
      
      // Get recent deposits
      const { data: recentDepositsData, error: depositsError } = await supabase
        .from('deposits')
        .select(`
          id,
          amount,
          created_at,
          user_id,
          profiles!deposits_user_id_fkey(first_name, last_name)
        `)
        .eq('status', 'approved')
        // .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
        .order('created_at', { ascending: false })
        .limit(3);

      if (depositsError) console.error('Deposits query error:', depositsError);

      // Get recent withdrawals
      const { data: recentWithdrawalsData, error: withdrawalsError } = await supabase
        .from('withdrawals')
        .select(`
          id,
          amount,
          created_at,
          user_id,
          profiles!withdrawals_user_id_fkey(first_name, last_name)
        `)
        .eq('status', 'approved')
        // .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
        .order('created_at', { ascending: false })
        .limit(3);

      if (withdrawalsError) console.error('Withdrawals query error:', withdrawalsError);

      const recentDeposits = (recentDepositsData || []).map(d => ({
        id: d.id,
        name: `${d.profiles?.first_name} ${d.profiles?.last_name}`,
        amount: parseFloat(d.amount),
        date: d.created_at
      }));

      const recentWithdrawals = (recentWithdrawalsData || []).map(w => ({
        id: w.id,
        name: `${w.profiles?.first_name} ${w.profiles?.last_name}`,
        amount: parseFloat(w.amount),
        date: w.created_at
      }));

      setStats({
        totalClients: dashboardStats.totalClients,
        totalMasters: dashboardStats.totalIBs,
        todayDeposits: dashboardStats.todayDepositAmount,
        todayWithdrawals: 0, // Calculate if needed
        pendingKYC: dashboardStats.pendingKYC,
        activeAccounts: dashboardStats.activeAccounts,
        recentDeposits,
        recentWithdrawals
      });
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error loading dashboard</h2>
        <p>{error}</p>
        <button onClick={fetchStats} className="retry-btn">
          <MdRefresh size={20} />
          <span>Retry</span>
        </button>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="error-container">
        <h2>No data available</h2>
        <button onClick={fetchStats} className="retry-btn">
          <MdRefresh size={20} />
          <span>Retry</span>
        </button>
      </div>
    );
  }

  return (
    <div className="broker-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Broker Owner Panel</p>
        </div>
        <button onClick={fetchStats} className="refresh-btn">
          <MdRefresh size={20} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Welcome Banner */}
      <div className="welcome-banner">
        <h2>Welcome, Super Admin! 👋</h2>
        <p>Here's what's happening with your broker platform today</p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {/* Total Clients */}
        <div className="stat-card blue">
          <div className="stat-header">
            <div className="stat-icon">
              <MdPeople size={28} />
            </div>
            <span className="stat-label">Total Clients</span>
          </div>
          <h3 className="stat-value">{stats.totalClients.toLocaleString()}</h3>
          <p className="stat-subtitle">Active trading accounts</p>
        </div>

        {/* Total Masters */}
        <div className="stat-card purple">
          <div className="stat-header">
            <div className="stat-icon">
              <MdTrendingUp size={28} />
            </div>
            <span className="stat-label">Total Masters/IBs</span>
          </div>
          <h3 className="stat-value">{stats.totalMasters}</h3>
          <p className="stat-subtitle">Introducing Brokers</p>
        </div>

        {/* Today's Deposits */}
        <div className="stat-card green">
          <div className="stat-header">
            <div className="stat-icon">
              <MdArrowDownward size={28} />
            </div>
            <span className="stat-label">Today's Deposits</span>
          </div>
          <h3 className="stat-value">₹{stats.todayDeposits.toLocaleString()}</h3>
          <p className="stat-subtitle">Approved deposits today</p>
        </div>

        {/* Today's Withdrawals */}
        <div className="stat-card orange">
          <div className="stat-header">
            <div className="stat-icon">
              <MdArrowUpward size={28} />
            </div>
            <span className="stat-label">Today's Withdrawals</span>
          </div>
          <h3 className="stat-value">₹{stats.todayWithdrawals.toLocaleString()}</h3>
          <p className="stat-subtitle">Processing smoothly</p>
        </div>

        {/* Pending KYC */}
        <div className="stat-card red">
          <div className="stat-header">
            <div className="stat-icon">
              <MdVerifiedUser size={28} />
            </div>
            <span className="stat-label">Pending KYC</span>
          </div>
          <h3 className="stat-value">{stats.pendingKYC}</h3>
          <p className="stat-subtitle">Needs verification</p>
        </div>

        {/* Active Accounts */}
        <div className="stat-card teal">
          <div className="stat-header">
            <div className="stat-icon">
              <MdShowChart size={28} />
            </div>
            <span className="stat-label">Active Accounts</span>
          </div>
          <h3 className="stat-value">{stats.activeAccounts.toLocaleString()}</h3>
          <p className="stat-subtitle">Currently trading</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="recent-activity">
        {/* Recent Deposits */}
        <div className="activity-card">
          <div className="activity-header">
            <h3>Recent Deposits</h3>
            <div className="activity-icon-badge green">
              <MdArrowDownward size={20} />
            </div>
          </div>
          <div className="activity-list">
            {stats.recentDeposits && stats.recentDeposits.length > 0 ? (
              stats.recentDeposits.map((deposit) => (
                <div key={deposit.id} className="activity-item">
                  <div className="activity-avatar green">
                    <MdAccountBalance size={20} />
                  </div>
                  <div className="activity-info">
                    <span className="activity-name">{deposit.name}</span>
                    <span className="activity-time">
                      {new Date(deposit.date).toLocaleDateString('en-IN')} at{' '}
                      {new Date(deposit.date).toLocaleTimeString('en-IN', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                  <div className="activity-amount green">
                    +₹{deposit.amount.toLocaleString()}
                  </div>
                </div>
              ))
            ) : (
              <p className="no-data">No recent deposits</p>
            )}
          </div>
        </div>

        {/* Recent Withdrawals */}
        <div className="activity-card">
          <div className="activity-header">
            <h3>Recent Withdrawals</h3>
            <div className="activity-icon-badge orange">
              <MdArrowUpward size={20} />
            </div>
          </div>
          <div className="activity-list">
            {stats.recentWithdrawals && stats.recentWithdrawals.length > 0 ? (
              stats.recentWithdrawals.map((withdrawal) => (
                <div key={withdrawal.id} className="activity-item">
                  <div className="activity-avatar orange">
                    <MdAttachMoney size={20} />
                  </div>
                  <div className="activity-info">
                    <span className="activity-name">{withdrawal.name}</span>
                    <span className="activity-time">
                      {new Date(withdrawal.date).toLocaleDateString('en-IN')} at{' '}
                      {new Date(withdrawal.date).toLocaleTimeString('en-IN', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                  <div className="activity-amount orange">
                    -₹{withdrawal.amount.toLocaleString()}
                  </div>
                </div>
              ))
            ) : (
              <p className="no-data">No recent withdrawals</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}