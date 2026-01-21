import React, { useState, useEffect } from 'react';
import { FiLink, FiAtSign, FiDollarSign } from 'react-icons/fi';
import '../../styles/Admin/IBDashboard.css';
import { getCurrentUser } from '../../lib/supabase/helpers';
import { supabase } from '../../lib/supabase/client';

function IBDashboard() {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [ibData, setIbData] = useState({
    balance: 0,
    ibNumber: '',
    payoutCommission: 0,
    payoutFromDate: '',
    totalReferrals: 0,
    activeClients: 0,
    totalEarned: 0
  });

  useEffect(() => {
    fetchIBData();
  }, []);

  const fetchIBData = async () => {
    try {
      setLoading(true);
      
      const user = await getCurrentUser();
      if (!user) {
        console.log('No user logged in');
        setLoading(false);
        return;
      }

      setCurrentUser(user);

      // Get IB hierarchy data
      const { data: ibHierarchy } = await supabase
        .from('ib_hierarchy')
        .select('*')
        .eq('ib_id', user.user.id)
        .single();

      // Get all referred clients
      const { data: referredClients } = await supabase
        .from('profiles')
        .select('id, status, created_at')
        .eq('referred_by', user.user.id);

      const totalReferrals = referredClients?.length || 0;
      const activeClients = referredClients?.filter(c => c.status === 'active').length || 0;

      // Calculate total commission earned from referred clients
      let totalEarned = 0;
      if (referredClients && referredClients.length > 0) {
        for (const client of referredClients) {
          const { data: deposits } = await supabase
            .from('deposits')
            .select('amount')
            .eq('user_id', client.id)
            .eq('status', 'approved');
          
          const clientTotal = deposits?.reduce((sum, d) => sum + parseFloat(d.amount), 0) || 0;
          totalEarned += clientTotal * 0.05; // 5% commission
        }
      }

      // Get pending payouts
      const { data: pendingPayouts } = await supabase
        .from('payouts')
        .select('amount')
        .eq('beneficiary_id', user.user.id)
        .eq('status', 'pending');

      const payoutCommission = pendingPayouts?.reduce((sum, p) => sum + parseFloat(p.amount), 0) || 0;

      setIbData({
        balance: ibHierarchy?.total_commission || totalEarned,
        ibNumber: user.profile?.referral_code || 'N/A',
        payoutCommission: payoutCommission,
        payoutFromDate: new Date().toLocaleString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }),
        totalReferrals,
        activeClients,
        totalEarned: totalEarned.toFixed(2)
      });

    } catch (error) {
      console.error('Error fetching IB data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWithdrawCommission = () => {
    if (ibData.balance <= 0) {
      alert('No commission available to withdraw');
      return;
    }
    window.location.href = '/admin/withdraw';
  };

  const handleViewHistory = () => {
    window.location.href = '/admin/transaction-history';
  };

  const handleCopyReferralLink = () => {
    const link = `${window.location.origin}/register?ref=${ibData.ibNumber}`;
    navigator.clipboard.writeText(link);
    alert('Referral link copied to clipboard!');
  };

  if (loading) {
    return (
      <div className="ib-dashboard-page">
        <div className="loading" style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '50vh',
          fontSize: '18px'
        }}>
          Loading IB dashboard...
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="ib-dashboard-page">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '50vh',
          flexDirection: 'column',
          gap: '20px'
        }}>
          <h2>Please login to view IB dashboard</h2>
          <button 
            onClick={() => window.location.href = '/login'}
            style={{
              padding: '10px 20px',
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="ib-dashboard-page">
      <div className="ib-header">
        <h1>IB Dashboard</h1>
        <p>Your Introducing Broker summary and tools.</p>
      </div>

      <div className="ib-actions">
        <button className="btn-action withdraw" onClick={handleWithdrawCommission}>
          Withdraw Commission
        </button>
        <button className="btn-action history" onClick={handleViewHistory}>
          View History
        </button>
      </div>

      {/* IB Stats Cards */}
      <div className="ib-stats-grid">
        <div className="stat-card">
          <div className="stat-label">IB Balance</div>
          <div className="stat-value green">${parseFloat(ibData.balance).toFixed(2)}</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">IB Number</div>
          <div className="stat-value">{ibData.ibNumber}</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Payout Commission</div>
          <div className="stat-value">${parseFloat(ibData.payoutCommission).toFixed(2)}</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Payout From Date</div>
          <div className="stat-value small">{ibData.payoutFromDate}</div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="how-it-works">
        <h2>How It Works</h2>
        <div className="works-grid">
          <div className="work-step">
            <div className="step-icon">
              <FiLink size={32} />
            </div>
            <h3>1. Get Your Link</h3>
            <p>Find your unique referral links in the "Referral Links" section.</p>
          </div>

          <div className="work-step">
            <div className="step-icon">
              <FiAtSign size={32} />
            </div>
            <h3>2. Share & Refer</h3>
            <p>Share the links with potential clients through your website or social media.</p>
          </div>

          <div className="work-step">
            <div className="step-icon">
              <FiDollarSign size={32} />
            </div>
            <h3>3. Earn Commission</h3>
            <p>Earn a commission for every trade your referred clients make.</p>
          </div>
        </div>
      </div>

      {/* Referral Tools */}
      <div className="referral-tools">
        <h2>Referral Tools</h2>
        
        <div className="tools-grid">
          <div className="tool-card">
            <h3>Your Referral Link</h3>
            <div className="link-box">
              <input
                type="text"
                value={`${window.location.origin}/register?ref=${ibData.ibNumber}`}
                readOnly
              />
              <button className="btn-copy" onClick={handleCopyReferralLink}>
                Copy Link
              </button>
            </div>
            <p className="tool-description">
              Share this link to refer new clients and earn commissions on their trading activity.
            </p>
          </div>

          <div className="tool-card">
            <h3>Quick Stats</h3>
            <div className="quick-stats">
              <div className="quick-stat-item">
                <span className="stat-number">{ibData.totalReferrals}</span>
                <span className="stat-text">Total Referrals</span>
              </div>
              <div className="quick-stat-item">
                <span className="stat-number">{ibData.activeClients}</span>
                <span className="stat-text">Active Clients</span>
              </div>
              <div className="quick-stat-item">
                <span className="stat-number">${ibData.totalEarned}</span>
                <span className="stat-text">Total Earned</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Commission Structure */}
      <div className="commission-structure">
        <h2>Commission Structure</h2>
        <div className="structure-table">
          <table>
            <thead>
              <tr>
                <th>Trading Volume</th>
                <th>Commission Rate</th>
                <th>Payout Frequency</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>$0 - $100,000</td>
                <td>5% of deposits</td>
                <td>Weekly</td>
              </tr>
              <tr>
                <td>$100,001 - $500,000</td>
                <td>7% of deposits</td>
                <td>Weekly</td>
              </tr>
              <tr>
                <td>$500,001+</td>
                <td>10% of deposits</td>
                <td>Weekly</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default IBDashboard;