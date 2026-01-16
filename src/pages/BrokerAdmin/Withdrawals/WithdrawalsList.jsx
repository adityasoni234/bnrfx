import React, { useState, useEffect } from 'react';
import { 
  MdSearch, 
  MdFileDownload, 
  MdCheckCircle, 
  MdCancel,
  MdVisibility,
  MdAccountBalance,
  MdRefresh,
  MdWarning
} from 'react-icons/md';
import './WithdrawalsList.css';
import { getAllWithdrawals, updateWithdrawalStatus } from '../../../lib/supabase/helpers';
import { api } from '../../../services/api';

export default function WithdrawalsList() {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedWithdrawal, setSelectedWithdrawal] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const fetchWithdrawals = async () => {
    try {
      setLoading(true);
      const data = await getAllWithdrawals();
      
      const formattedWithdrawals = data.map(withdrawal => ({
        id: withdrawal.id,
        userId: withdrawal.user_id,
        userName: `${withdrawal.profiles?.first_name} ${withdrawal.profiles?.last_name}`,
        userEmail: withdrawal.profiles?.email,
        amount: parseFloat(withdrawal.amount),
        currency: withdrawal.currency || 'INR',
        method: withdrawal.withdrawal_method?.toUpperCase() || 'BANK_TRANSFER',
        upiId: withdrawal.upi_id,
        accountNumber: withdrawal.account_number,
        ifscCode: withdrawal.ifsc_code,
        status: withdrawal.status?.toUpperCase() || 'PENDING',
        mt5Login: withdrawal.mt5_login || 'N/A',
        mt5Balance: parseFloat(withdrawal.mt5_balance || 0),
        createdAt: new Date(withdrawal.created_at),
        approvedBy: withdrawal.processed_by,
        approvedAt: withdrawal.processed_at ? new Date(withdrawal.processed_at) : null,
        paidAt: withdrawal.processed_at ? new Date(withdrawal.processed_at) : null,
        utrNumber: withdrawal.utr_number,
        rejectionReason: withdrawal.rejection_reason
      }));

      setWithdrawals(formattedWithdrawals);
    } catch (error) {
      console.error('Error fetching withdrawals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (withdrawalId) => {
    const withdrawal = withdrawals.find(w => w.id === withdrawalId);
    
    if (withdrawal.amount > withdrawal.mt5Balance) {
      alert('Error: Withdrawal amount exceeds MT5 balance!');
      return;
    }

    
    const utr = prompt('Enter UTR/Transaction Reference Number:');
    if (utr) {
      try {
        console.log('💰 Processing withdrawal:', { 
          mt5Login: withdrawal.mt5Login, 
          amount: withdrawal.amount 
        });

        // Step 1: Withdraw from MT5 account if mt5_login exists
        if (withdrawal.mt5Login && withdrawal.mt5Login !== 'N/A') {
          console.log('📞 Calling MT5 withdraw API...');
          try {
            const mt5Result = await api.withdraw({
              login: withdrawal.mt5Login,
              amount: withdrawal.amount,
              comment: `Withdrawal approval - UTR: ${utr}`
            });
            
            if (!mt5Result.success) {
              alert(`Failed to withdraw from MT5 account: ${mt5Result.message || 'Unknown error'}`);
              return;
            }
            
            // console.log('✅ MT5 withdrawal successful:', mt5Result);
          } catch (mt5Error) {
            console.error('❌ MT5 withdrawal failed:', mt5Error);
            alert(`Failed to withdraw from MT5 account: ${mt5Error.message || 'Unknown error'}`);
            return;
          }
        }

        // Step 2: Update withdrawal status in Supabase
        await updateWithdrawalStatus(withdrawalId, 'approved', null);
        await fetchWithdrawals();
        setShowModal(false);
        alert('Withdrawal approved! Amount debited from account.');
      } catch (error) {
        console.error('Error approving withdrawal:', error);
        alert('Failed to approve withdrawal');
      }
    }
  };

  const handleReject = async (withdrawalId) => {
    const reason = prompt('Enter rejection reason:');
    if (reason) {
      try {
        await updateWithdrawalStatus(withdrawalId, 'rejected', null, reason);
        await fetchWithdrawals();
        setShowModal(false);
        alert('Withdrawal rejected!');
      } catch (error) {
        console.error('Error rejecting withdrawal:', error);
        alert('Failed to reject withdrawal');
      }
    }
  };

  const handleViewDetails = (withdrawal) => {
    setSelectedWithdrawal(withdrawal);
    setShowModal(true);
  };

  const filteredWithdrawals = withdrawals.filter(withdrawal => {
    const matchesSearch = 
      withdrawal.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      withdrawal.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      withdrawal.mt5Login.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'ALL' || withdrawal.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const stats = {
    pending: withdrawals.filter(w => w.status === 'PENDING').length,
    approved: withdrawals.filter(w => w.status === 'APPROVED').length,
    rejected: withdrawals.filter(w => w.status === 'REJECTED').length,
    totalAmount: withdrawals
      .filter(w => w.status === 'APPROVED')
      .reduce((sum, w) => sum + w.amount, 0)
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading withdrawals...</p>
      </div>
    );
  }

  return (
    <div className="withdrawals-container">
      {/* Stats Cards */}
      <div className="withdrawal-stats">
        <div className="stat-card-small pending">
          <div className="stat-icon">⏳</div>
          <div className="stat-info">
            <p>Pending</p>
            <h3>{stats.pending}</h3>
          </div>
        </div>
        <div className="stat-card-small approved">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <p>Processed Today</p>
            <h3>{stats.approved}</h3>
          </div>
        </div>
        <div className="stat-card-small rejected">
          <div className="stat-icon">❌</div>
          <div className="stat-info">
            <p>Rejected</p>
            <h3>{stats.rejected}</h3>
          </div>
        </div>
        <div className="stat-card-small total">
          <div className="stat-icon">💸</div>
          <div className="stat-info">
            <p>Total Paid</p>
            <h3>₹{stats.totalAmount.toLocaleString()}</h3>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="withdrawals-header">
        <div>
          <h1>Withdrawal Requests</h1>
          <p>Review and process withdrawal requests</p>
        </div>
        <button className="btn btn-primary" onClick={fetchWithdrawals}>
          <MdRefresh size={20} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Filters */}
      <div className="withdrawals-filters">
        <div className="search-box">
          <MdSearch size={20} />
          <input
            type="text"
            placeholder="Search by name, email, MT5 login..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="filter-select"
        >
          <option value="ALL">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>

        <button className="btn btn-success">
          <MdFileDownload size={20} />
          <span>Export</span>
        </button>
      </div>

      {/* Results Info */}
      <div className="results-info">
        <p>Showing {filteredWithdrawals.length} of {withdrawals.length} withdrawals</p>
      </div>

      {/* Withdrawals Table */}
      <div className="withdrawals-table-container">
        <table className="withdrawals-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Client</th>
              <th>Amount</th>
              <th>MT5 Balance</th>
              <th>Method</th>
              <th>Account Details</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredWithdrawals.length === 0 ? (
              <tr>
                <td colSpan="9" className="no-data">
                  No withdrawal requests found
                </td>
              </tr>
            ) : (
              filteredWithdrawals.map((withdrawal) => (
                <tr key={withdrawal.id}>
                  <td>
                    <span className="withdrawal-id">#{withdrawal.id.substring(0, 8)}</span>
                  </td>
                  <td>
                    <div className="client-info-small">
                      <div className="client-name">{withdrawal.userName}</div>
                      <div className="client-email">{withdrawal.userEmail}</div>
                      <div className="mt5-login-small">MT5: {withdrawal.mt5Login}</div>
                    </div>
                  </td>
                  <td>
                    <span className="amount withdrawal-amount">₹{withdrawal.amount.toLocaleString()}</span>
                  </td>
                  <td>
                    <div className="balance-info">
                      <span className="balance">₹{withdrawal.mt5Balance.toLocaleString()}</span>
                      {withdrawal.amount > withdrawal.mt5Balance && (
                        <span className="insufficient-badge">
                          <MdWarning size={14} /> Insufficient
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    <span className="method-badge">{withdrawal.method.replace('_', ' ')}</span>
                  </td>
                  <td>
                    {withdrawal.method === 'UPI' ? (
                      <span className="account-detail">{withdrawal.upiId}</span>
                    ) : (
                      <div className="account-detail">
                        <div>A/c: {withdrawal.accountNumber}</div>
                        <div className="ifsc">IFSC: {withdrawal.ifscCode}</div>
                      </div>
                    )}
                  </td>
                  <td>
                    <span className={`status-badge status-${withdrawal.status.toLowerCase()}`}>
                      {withdrawal.status}
                    </span>
                  </td>
                  <td>{withdrawal.createdAt.toLocaleDateString()} {withdrawal.createdAt.toLocaleTimeString()}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-icon btn-view" 
                        title="View Details"
                        onClick={() => handleViewDetails(withdrawal)}
                      >
                        <MdVisibility size={18} />
                      </button>
                      {withdrawal.status === 'PENDING' && (
                        <>
                          <button 
                            className="btn-icon btn-approve" 
                            title="Approve & Pay"
                            onClick={() => handleApprove(withdrawal.id)}
                            disabled={withdrawal.amount > withdrawal.mt5Balance}
                          >
                            <MdCheckCircle size={18} />
                          </button>
                          <button 
                            className="btn-icon btn-reject" 
                            title="Reject"
                            onClick={() => handleReject(withdrawal.id)}
                          >
                            <MdCancel size={18} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button className="btn btn-secondary" disabled>Previous</button>
        <span>Page 1 of 1</span>
        <button className="btn btn-secondary" disabled>Next</button>
      </div>

      {/* Modal - Same as before with selectedWithdrawal data */}
      {showModal && selectedWithdrawal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Withdrawal Details</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="detail-row">
                <span className="detail-label">Withdrawal ID:</span>
                <span className="detail-value">#{selectedWithdrawal.id.substring(0, 8)}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Client Name:</span>
                <span className="detail-value">{selectedWithdrawal.userName}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Amount:</span>
                <span className="detail-value amount">₹{selectedWithdrawal.amount.toLocaleString()}</span>
              </div>
              {selectedWithdrawal.status === 'PENDING' && (
                <div className="modal-footer">
                  <button 
                    className="btn btn-success"
                    onClick={() => handleApprove(selectedWithdrawal.id)}
                  >
                    <MdCheckCircle size={20} />
                    Approve & Pay
                  </button>
                  <button 
                    className="btn btn-danger"
                    onClick={() => handleReject(selectedWithdrawal.id)}
                  >
                    <MdCancel size={20} />
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}