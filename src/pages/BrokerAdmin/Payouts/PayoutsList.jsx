import React, { useState, useEffect } from 'react';
import { 
  MdSearch, 
  MdFileDownload, 
  MdVisibility,
  MdCheckCircle,
  MdCancel,
  MdRefresh,
  MdAccountBalance
} from 'react-icons/md';
import './PayoutsList.css';
import { getAllPayouts, updatePayoutStatus } from '../../../lib/supabase/helpers';

export default function PayoutsList() {
  const [payouts, setPayouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedPayout, setSelectedPayout] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchPayouts();
  }, []);

  const fetchPayouts = async () => {
    try {
      setLoading(true);
      const data = await getAllPayouts();
      
      const formattedPayouts = data.map(payout => ({
        id: payout.id,
        beneficiaryId: payout.beneficiary_id,
        beneficiaryName: `${payout.profiles?.first_name} ${payout.profiles?.last_name}`,
        beneficiaryEmail: payout.profiles?.email,
        amount: parseFloat(payout.amount),
        currency: payout.currency || 'INR',
        mode: payout.mode?.toUpperCase() || 'BANK_TRANSFER',
        bankName: payout.bank_name,
        accountNumber: payout.account_number,
        ifscCode: payout.ifsc_code,
        upiId: payout.upi_id,
        accountHolderName: payout.account_holder_name,
        status: payout.status?.toUpperCase() || 'PENDING',
        requestedAt: new Date(payout.created_at),
        processedBy: payout.processed_by,
        processedAt: payout.processed_at ? new Date(payout.processed_at) : null,
        utrNumber: payout.utr_number,
        rejectionReason: payout.rejection_reason
      }));

      setPayouts(formattedPayouts);
    } catch (error) {
      console.error('Error fetching payouts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (payoutId) => {
    const utr = prompt('Enter UTR/Transaction Reference Number:');
    if (utr) {
      try {
        await updatePayoutStatus(payoutId, 'completed', 'Super Admin', utr);
        await fetchPayouts();
        setShowModal(false);
        alert('Payout approved and processed!');
      } catch (error) {
        console.error('Error approving payout:', error);
        alert('Failed to approve payout');
      }
    }
  };

  const handleReject = async (payoutId) => {
    const reason = prompt('Enter rejection reason:');
    if (reason) {
      try {
        await updatePayoutStatus(payoutId, 'rejected', 'Super Admin');
        await fetchPayouts();
        setShowModal(false);
        alert('Payout rejected!');
      } catch (error) {
        console.error('Error rejecting payout:', error);
        alert('Failed to reject payout');
      }
    }
  };

  const handleViewDetails = (payout) => {
    setSelectedPayout(payout);
    setShowModal(true);
  };

  const filteredPayouts = payouts.filter(payout => {
    const matchesSearch = 
      payout.beneficiaryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payout.beneficiaryEmail.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'ALL' || payout.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const stats = {
    pending: payouts.filter(p => p.status === 'PENDING').length,
    completed: payouts.filter(p => p.status === 'COMPLETED').length,
    rejected: payouts.filter(p => p.status === 'REJECTED').length,
    totalAmount: payouts
      .filter(p => p.status === 'COMPLETED')
      .reduce((sum, p) => sum + p.amount, 0)
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading payouts...</p>
      </div>
    );
  }

  return (
    <div className="payouts-container">
      {/* Stats Cards */}
      <div className="payout-stats">
        <div className="stat-card-small pending">
          <div className="stat-icon">⏳</div>
          <div className="stat-info">
            <p>Pending Payouts</p>
            <h3>{stats.pending}</h3>
          </div>
        </div>
        <div className="stat-card-small completed">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <p>Completed</p>
            <h3>{stats.completed}</h3>
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
            <p>Total Paid</p>
            <h3>₹{stats.totalAmount.toLocaleString()}</h3>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="payouts-header">
        <div>
          <h1>IB Payout Requests</h1>
          <p>Manage IB partner payout requests</p>
        </div>
        <button className="btn btn-primary" onClick={fetchPayouts}>
          <MdRefresh size={20} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Filters */}
      <div className="payouts-filters">
        <div className="search-box">
          <MdSearch size={20} />
          <input
            type="text"
            placeholder="Search by IB name or email..."
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
          <option value="COMPLETED">Completed</option>
          <option value="REJECTED">Rejected</option>
        </select>

        <button className="btn btn-success">
          <MdFileDownload size={20} />
          <span>Export</span>
        </button>
      </div>

      {/* Results Info */}
      <div className="results-info">
        <p>Showing {filteredPayouts.length} of {payouts.length} payouts</p>
      </div>

      {/* Payouts Table */}
      <div className="payouts-table-container">
        <table className="payouts-table">
          <thead>
            <tr>
              <th>Payout ID</th>
              <th>IB Partner</th>
              <th>Amount</th>
              <th>Mode</th>
              <th>Bank Details</th>
              <th>Status</th>
              <th>Requested</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayouts.length === 0 ? (
              <tr>
                <td colSpan="8" className="no-data">
                  No payout requests found
                </td>
              </tr>
            ) : (
              filteredPayouts.map((payout) => (
                <tr key={payout.id}>
                  <td>
                    <span className="payout-id">#{payout.id.substring(0, 8)}</span>
                  </td>
                  <td>
                    <div className="client-info-small">
                      <div className="client-name">{payout.beneficiaryName}</div>
                      <div className="client-email">{payout.beneficiaryEmail}</div>
                    </div>
                  </td>
                  <td>
                    <span className="amount">₹{payout.amount.toLocaleString()}</span>
                  </td>
                  <td>
                    <span className="mode-badge">{payout.mode.replace('_', ' ')}</span>
                  </td>
                  <td>
                    {payout.mode === 'UPI' ? (
                      <span className="bank-detail">{payout.upiId}</span>
                    ) : (
                      <div className="bank-detail">
                        <div>{payout.bankName}</div>
                        <div className="account-num">A/c: {payout.accountNumber}</div>
                      </div>
                    )}
                  </td>
                  <td>
                    <span className={`status-badge status-${payout.status.toLowerCase()}`}>
                      {payout.status}
                    </span>
                  </td>
                  <td>{payout.requestedAt.toLocaleDateString()}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-icon btn-view" 
                        title="View Details"
                        onClick={() => handleViewDetails(payout)}
                      >
                        <MdVisibility size={18} />
                      </button>
                      {payout.status === 'PENDING' && (
                        <>
                          <button 
                            className="btn-icon btn-approve" 
                            title="Approve & Pay"
                            onClick={() => handleApprove(payout.id)}
                          >
                            <MdCheckCircle size={18} />
                          </button>
                          <button 
                            className="btn-icon btn-reject" 
                            title="Reject"
                            onClick={() => handleReject(payout.id)}
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

      {/* Details Modal */}
      {showModal && selectedPayout && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Payout Details</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="detail-row">
                <span className="detail-label">Payout ID:</span>
                <span className="detail-value">#{selectedPayout.id.substring(0, 8)}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">IB Partner:</span>
                <span className="detail-value">{selectedPayout.beneficiaryName}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Email:</span>
                <span className="detail-value">{selectedPayout.beneficiaryEmail}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Amount:</span>
                <span className="detail-value amount">₹{selectedPayout.amount.toLocaleString()}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Payment Mode:</span>
                <span className="detail-value">{selectedPayout.mode.replace('_', ' ')}</span>
              </div>
              {selectedPayout.mode === 'UPI' ? (
                <div className="detail-row">
                  <span className="detail-label">UPI ID:</span>
                  <span className="detail-value">{selectedPayout.upiId}</span>
                </div>
              ) : (
                <>
                  <div className="detail-row">
                    <span className="detail-label">Account Holder:</span>
                    <span className="detail-value">{selectedPayout.accountHolderName}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Bank Name:</span>
                    <span className="detail-value">{selectedPayout.bankName}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Account Number:</span>
                    <span className="detail-value">{selectedPayout.accountNumber}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">IFSC Code:</span>
                    <span className="detail-value">{selectedPayout.ifscCode}</span>
                  </div>
                </>
              )}
              <div className="detail-row">
                <span className="detail-label">Status:</span>
                <span className={`status-badge status-${selectedPayout.status.toLowerCase()}`}>
                  {selectedPayout.status}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Requested:</span>
                <span className="detail-value">{selectedPayout.requestedAt.toLocaleString()}</span>
              </div>
              {selectedPayout.status === 'COMPLETED' && (
                <>
                  <div className="detail-row">
                    <span className="detail-label">UTR Number:</span>
                    <span className="detail-value">{selectedPayout.utrNumber}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Processed By:</span>
                    <span className="detail-value">{selectedPayout.processedBy}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Processed At:</span>
                    <span className="detail-value">{selectedPayout.processedAt?.toLocaleString()}</span>
                  </div>
                </>
              )}
              {selectedPayout.status === 'REJECTED' && (
                <div className="detail-row">
                  <span className="detail-label">Rejection Reason:</span>
                  <span className="detail-value rejection-reason">{selectedPayout.rejectionReason}</span>
                </div>
              )}
            </div>
            {selectedPayout.status === 'PENDING' && (
              <div className="modal-footer">
                <button 
                  className="btn btn-success"
                  onClick={() => handleApprove(selectedPayout.id)}
                >
                  <MdCheckCircle size={20} />
                  Approve & Pay
                </button>
                <button 
                  className="btn btn-danger"
                  onClick={() => handleReject(selectedPayout.id)}
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