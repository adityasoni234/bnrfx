import React, { useState, useEffect } from 'react';
import { FiUsers } from 'react-icons/fi';
import '../../styles/Admin/AttractedClients.css';
import { getCurrentUser } from '../../lib/supabase/helpers';
import { supabase } from '../../lib/supabase/client';

function AttractedClients() {
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [totalEntries, setTotalEntries] = useState(0);

  useEffect(() => {
    fetchReferredClients();
  }, []);

  const fetchReferredClients = async () => {
    try {
      setLoading(true);

      // Get current user
      const user = await getCurrentUser();
      if (!user) {
        console.log('No user logged in');
        setLoading(false);
        return;
      }

      setCurrentUser(user);

      // Get all clients referred by this user
      const { data: referredClients, error } = await supabase
        .from('profiles')
        .select(`
          id,
          first_name,
          last_name,
          email,
          country,
          created_at,
          wallets (
            total_balance
          )
        `)
        .eq('referred_by', user.user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching referred clients:', error);
        setClients([]);
        return;
      }

      // For each referred client, get their deposits, withdrawals, and calculate volume
      const enrichedClients = await Promise.all(
        (referredClients || []).map(async (client) => {
          // Get deposits
          const { data: deposits } = await supabase
            .from('deposits')
            .select('amount, status')
            .eq('user_id', client.id);

          const approvedDeposits = deposits?.filter(d => d.status === 'approved') || [];
          const totalDeposits = approvedDeposits.reduce((sum, d) => sum + parseFloat(d.amount), 0);

          // Get withdrawals
          const { data: withdrawals } = await supabase
            .from('withdrawals')
            .select('amount, status')
            .eq('user_id', client.id);

          const approvedWithdrawals = withdrawals?.filter(w => w.status === 'approved') || [];
          const totalWithdrawals = approvedWithdrawals.reduce((sum, w) => sum + parseFloat(w.amount), 0);

          // Get MT5 accounts for volume calculation
          const { data: mt5Accounts } = await supabase
            .from('mt5_accounts')
            .select('balance, equity')
            .eq('user_id', client.id);

          const totalVolume = mt5Accounts?.reduce((sum, acc) => sum + parseFloat(acc.balance || 0), 0) || 0;

          // Calculate commission (example: 5% of deposits)
          const totalCommission = totalDeposits * 0.05;

          return {
            userName: `${client.first_name || ''} ${client.last_name || ''}`.trim() || 'Unknown',
            userEmail: client.email,
            totalDeposits: totalDeposits,
            totalWithdrawals: totalWithdrawals,
            totalVolume: totalVolume.toFixed(2),
            totalCommission: totalCommission.toFixed(2),
            country: client.country || 'N/A',
            registrationDate: new Date(client.created_at).toLocaleDateString('en-IN', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })
          };
        })
      );

      setClients(enrichedClients);
      setTotalEntries(enrichedClients.length);

    } catch (error) {
      console.error('Error in fetchReferredClients:', error);
      setClients([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="attracted-clients-page">
        <div className="loading" style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '50vh',
          fontSize: '18px'
        }}>
          Loading referred clients...
        </div>
      </div>
    );
  }

  return (
    <div className="attracted-clients-page">
      <div className="clients-header">
        <div className="header-content">
          <FiUsers size={32} className="header-icon" />
          <div>
            <h1>Attracted Clients Details</h1>
            <p>View and manage all your referred clients</p>
          </div>
        </div>
      </div>

      <div className="clients-container">
        {/* Entries Per Page Selector */}
        <div className="table-controls">
          <div className="entries-control">
            <select
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span>entries per page</span>
          </div>
        </div>

        {/* Clients Table */}
        <div className="clients-table-container">
          <table className="clients-table">
            <thead>
              <tr>
                <th>USER NAME</th>
                <th>USER EMAIL</th>
                <th>TOTAL DEPOSITS (₹)</th>
                <th>TOTAL WITHDRAWALS (₹)</th>
                <th>TOTAL VOLUME (₹)</th>
                <th>TOTAL COMMISSION (₹)</th>
                <th>COUNTRY</th>
                <th>REGISTRATION DATE</th>
              </tr>
            </thead>
            <tbody>
              {clients.length > 0 ? (
                clients.slice(0, entriesPerPage).map((client, index) => (
                  <tr key={index}>
                    <td>{client.userName}</td>
                    <td>{client.userEmail}</td>
                    <td className="amount">₹{parseFloat(client.totalDeposits).toLocaleString()}</td>
                    <td className="amount">₹{parseFloat(client.totalWithdrawals).toLocaleString()}</td>
                    <td className="volume">₹{client.totalVolume}</td>
                    <td className="commission">₹{client.totalCommission}</td>
                    <td>{client.country}</td>
                    <td>{client.registrationDate}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="no-data">
                    <div className="empty-state">
                      <FiUsers size={64} className="empty-icon" />
                      <h3>No clients found.</h3>
                      <p>Start sharing your referral link to attract new clients!</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Info */}
        <div className="pagination-info">
          <span>
            Showing 1 to {Math.min(entriesPerPage, clients.length)} of {totalEntries} entries
          </span>
        </div>
      </div>
    </div>
  );
}

export default AttractedClients;