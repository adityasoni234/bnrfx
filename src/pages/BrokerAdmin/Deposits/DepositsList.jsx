import React, { useState, useEffect } from 'react';
import { 
  MdSearch, 
  MdFileDownload, 
  MdCheckCircle, 
  MdCancel,
  MdVisibility,
  MdAttachFile,
  MdRefresh
} from 'react-icons/md';
import './DepositsList.css';
import { getAllDeposits, updateDepositStatus } from '../../../lib/supabase/helpers';
import { supabase } from '../../../lib/supabase/client';

export default function DepositsList() {
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedDeposit, setSelectedDeposit] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchDeposits();
  }, []);

  const fetchDeposits = async () => {
    try {
      setLoading(true);
      const data = await getAllDeposits();
      
      const formattedDeposits = data.map(deposit => ({
        id: deposit.id,
        userId: deposit.user_id,
        userName: `${deposit.profiles?.first_name} ${deposit.profiles?.last_name}`,
        userEmail: deposit.profiles?.email,
        amount: parseFloat(deposit.amount),
        currency: deposit.currency || 'INR',
        method: deposit.payment_method?.toUpperCase() || 'UPI',
        utrNumber: deposit.utr_number || 'N/A',
        paymentProofUrl: deposit.payment_proof_url,
        status: deposit.status?.toUpperCase() || 'PENDING',
        createdAt: new Date(deposit.created_at),
        mt5Login: deposit.mt5_login || 'N/A',
        processedBy: deposit.processed_by,
        processedAt: deposit.processed_at ? new Date(deposit.processed_at) : null,
        approvedBy: deposit.processed_by,
        approvedAt: deposit.processed_at ? new Date(deposit.processed_at) : null,
        rejectionReason: deposit.rejection_reason
      }));

      setDeposits(formattedDeposits);
    } catch (error) {
      console.error('Error fetching deposits:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (depositId) => {
    if (window.confirm('Are you sure you want to approve this deposit?')) {
      try {
        console.log('🔍 Step 1: Starting approval for deposit:', depositId)
        
        // Get current user ID
        const { data: { user } } = await supabase.auth.getUser()
        const currentUserId = user?.id
        
        if (!currentUserId) {
          alert('Error: Could not get current user ID')
          return
        }
        
        console.log('👤 Current user ID:', currentUserId)
        
        const result = await updateDepositStatus(depositId, 'approved', currentUserId)
        
        console.log('✅ Step 2: Update completed:', result)
        
        await fetchDeposits()
        console.log('✅ Step 3: Deposits refreshed')
        
        setShowModal(false)
        
        alert('Deposit approved successfully! Amount credited to wallet.')
      } catch (error) {
        console.error('❌ APPROVAL FAILED')
        console.error('Error object:', error)
        console.error('Error message:', error.message)
        console.error('Error details:', error)
        alert(`Failed to approve deposit: ${error.message || 'Unknown error'}`)
      }
    }
  };

  const handleReject = async (depositId) => {
    const reason = prompt('Enter rejection reason:');
    if (reason && reason.trim()) {
      try {
        console.log('🔍 Rejecting deposit:', depositId, 'Reason:', reason)
        
        // Get current user ID
        const { data: { user } } = await supabase.auth.getUser()
        const currentUserId = user?.id
        
        if (!currentUserId) {
          alert('Error: Could not get current user ID')
          return
        }
        
        const result = await updateDepositStatus(depositId, 'rejected', currentUserId, reason)
        
        console.log('✅ Rejection completed:', result)
        
        await fetchDeposits()
        setShowModal(false)
        
        alert('Deposit rejected successfully!')
      } catch (error) {
        console.error('❌ REJECTION FAILED')
        console.error('Error:', error)
        alert(`Failed to reject deposit: ${error.message || 'Unknown error'}`)
      }
    } else if (reason !== null) {
      alert('Please provide a rejection reason')
    }
  };

  const handleViewDetails = (deposit) => {
    setSelectedDeposit(deposit);
    setShowModal(true);
  };

  const filteredDeposits = deposits.filter(deposit => {
    const matchesSearch = 
      deposit.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deposit.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deposit.utrNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'ALL' || deposit.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const stats = {
    pending: deposits.filter(d => d.status === 'PENDING').length,
    approved: deposits.filter(d => d.status === 'APPROVED').length,
    rejected: deposits.filter(d => d.status === 'REJECTED').length,
    totalAmount: deposits
      .filter(d => d.status === 'APPROVED')
      .reduce((sum, d) => sum + d.amount, 0)
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading deposits...</p>
      </div>
    );
  }

  return (
    <div className="deposits-container">
      {/* Stats Cards */}
      <div className="deposit-stats">
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
            <p>Approved Today</p>
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
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <p>Total Approved</p>
            <h3>₹{stats.totalAmount.toLocaleString()}</h3>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="deposits-header">
        <div>
          <h1>Deposit Requests</h1>
          <p>Review and approve deposit requests</p>
        </div>
        <button className="btn btn-primary" onClick={fetchDeposits}>
          <MdRefresh size={20} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Filters */}
      <div className="deposits-filters">
        <div className="search-box">
          <MdSearch size={20} />
          <input
            type="text"
            placeholder="Search by name, email, UTR..."
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
        <p>Showing {filteredDeposits.length} of {deposits.length} deposits</p>
      </div>

      {/* Deposits Table */}
      <div className="deposits-table-container">
        <table className="deposits-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Client</th>
              <th>Amount</th>
              <th>Method</th>
              <th>UTR Number</th>
              <th>MT5 Login</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDeposits.length === 0 ? (
              <tr>
                <td colSpan="9" className="no-data">
                  No deposit requests found
                </td>
              </tr>
            ) : (
              filteredDeposits.map((deposit) => (
                <tr key={deposit.id}>
                  <td>
                    <span className="deposit-id">#{deposit.id.substring(0, 8)}</span>
                  </td>
                  <td>
                    <div className="client-info-small">
                      <div className="client-name">{deposit.userName}</div>
                      <div className="client-email">{deposit.userEmail}</div>
                    </div>
                  </td>
                  <td>
                    <span className="amount">₹{deposit.amount.toLocaleString()}</span>
                  </td>
                  <td>
                    <span className="method-badge">{deposit.method.replace('_', ' ')}</span>
                  </td>
                  <td>
                    <span className="utr-number">{deposit.utrNumber}</span>
                  </td>
                  <td>
                    <span className="mt5-badge">{deposit.mt5Login}</span>
                  </td>
                  <td>
                    <span className={`status-badge status-${deposit.status.toLowerCase()}`}>
                      {deposit.status}
                    </span>
                  </td>
                  <td>{deposit.createdAt.toLocaleDateString()} {deposit.createdAt.toLocaleTimeString()}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-icon btn-view" 
                        title="View Details"
                        onClick={() => handleViewDetails(deposit)}
                      >
                        <MdVisibility size={18} />
                      </button>
                      {deposit.status === 'PENDING' && (
                        <>
                          <button 
                            className="btn-icon btn-approve" 
                            title="Approve"
                            onClick={() => handleApprove(deposit.id)}
                          >
                            <MdCheckCircle size={18} />
                          </button>
                          <button 
                            className="btn-icon btn-reject" 
                            title="Reject"
                            onClick={() => handleReject(deposit.id)}
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

      {/* Modal */}
      {showModal && selectedDeposit && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Deposit Details</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="detail-row">
                <span className="detail-label">Deposit ID:</span>
                <span className="detail-value">#{selectedDeposit.id.substring(0, 8)}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Client Name:</span>
                <span className="detail-value">{selectedDeposit.userName}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Email:</span>
                <span className="detail-value">{selectedDeposit.userEmail}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Amount:</span>
                <span className="detail-value amount">₹{selectedDeposit.amount.toLocaleString()}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Payment Method:</span>
                <span className="detail-value">{selectedDeposit.method.replace('_', ' ')}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">UTR Number:</span>
                <span className="detail-value">{selectedDeposit.utrNumber}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">MT5 Login:</span>
                <span className="detail-value">{selectedDeposit.mt5Login}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Status:</span>
                <span className={`status-badge status-${selectedDeposit.status.toLowerCase()}`}>
                  {selectedDeposit.status}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Submitted:</span>
                <span className="detail-value">{selectedDeposit.createdAt.toLocaleString()}</span>
              </div>
              {selectedDeposit.status === 'APPROVED' && (
                <>
                  <div className="detail-row">
                    <span className="detail-label">Approved By:</span>
                    <span className="detail-value">{selectedDeposit.approvedBy}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Approved At:</span>
                    <span className="detail-value">{selectedDeposit.approvedAt?.toLocaleString()}</span>
                  </div>
                </>
              )}
              {selectedDeposit.status === 'REJECTED' && (
                <div className="detail-row">
                  <span className="detail-label">Rejection Reason:</span>
                  <span className="detail-value rejection-reason">{selectedDeposit.rejectionReason}</span>
                </div>
              )}
              <div className="detail-row">
                <span className="detail-label">Payment Proof:</span>
                <a href={selectedDeposit.paymentProofUrl} target="_blank" rel="noopener noreferrer" className="btn btn-link">
                  <MdAttachFile size={18} />
                  View Proof
                </a>
              </div>
            </div>
            {selectedDeposit.status === 'PENDING' && (
              <div className="modal-footer">
                <button 
                  className="btn btn-success"
                  onClick={() => handleApprove(selectedDeposit.id)}
                >
                  <MdCheckCircle size={20} />
                  Approve & Credit to Wallet
                </button>
                <button 
                  className="btn btn-danger"
                  onClick={() => handleReject(selectedDeposit.id)}
                >
                  <MdCancel size={20} />
                  Reject
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

