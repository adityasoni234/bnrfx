import React, { useState, useEffect } from 'react';
import { 
  MdSearch, 
  MdFileDownload, 
  MdVisibility,
  MdCheckCircle,
  MdAttachMoney,
  MdRefresh,
  MdCalculate
} from 'react-icons/md';
import './RebatesList.css';
import { getAllRebates, updateRebateStatus } from '../../../lib/supabase/helpers';

export default function RebatesList() {
  const [rebates, setRebates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedRebate, setSelectedRebate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchRebates();
  }, []);

  const fetchRebates = async () => {
    try {
      setLoading(true);
      const data = await getAllRebates();
      
      const formattedRebates = data.map(rebate => ({
        id: rebate.id,
        userId: rebate.user_id,
        userName: `${rebate.profiles?.first_name} ${rebate.profiles?.last_name}`,
        userEmail: rebate.profiles?.email,
        month: rebate.month,
        year: rebate.year,
        totalLots: parseFloat(rebate.total_lots || 0),
        totalCommission: parseFloat(rebate.total_commission || 0),
        rebateRate: parseFloat(rebate.rebate_rate || 0),
        rebateAmount: parseFloat(rebate.amount || 0),
        status: rebate.status?.toUpperCase() || 'PENDING',
        calculatedAt: rebate.created_at ? new Date(rebate.created_at) : null,
        approvedAt: rebate.approved_at ? new Date(rebate.approved_at) : null,
        paidAt: rebate.paid_at ? new Date(rebate.paid_at) : null
      }));

      setRebates(formattedRebates);
    } catch (error) {
      console.error('Error fetching rebates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (rebateId) => {
    if (window.confirm('Are you sure you want to approve this rebate for payment?')) {
      try {
        await updateRebateStatus(rebateId, 'approved');
        await fetchRebates();
        setShowModal(false);
        alert('Rebate approved for payment!');
      } catch (error) {
        console.error('Error approving rebate:', error);
        alert('Failed to approve rebate');
      }
    }
  };

  const handleViewDetails = (rebate) => {
    setSelectedRebate(rebate);
    setShowModal(true);
  };

  const filteredRebates = rebates.filter(rebate => {
    const matchesSearch = 
      rebate.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rebate.userEmail.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'ALL' || rebate.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const stats = {
    pending: rebates.filter(r => r.status === 'PENDING').length,
    approved: rebates.filter(r => r.status === 'APPROVED').length,
    paid: rebates.filter(r => r.status === 'PAID').length,
    totalAmount: rebates
      .filter(r => r.status === 'APPROVED' || r.status === 'PAID')
      .reduce((sum, r) => sum + r.rebateAmount, 0)
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading rebates...</p>
      </div>
    );
  }

  return (
    <div className="rebates-container">
      {/* Stats Cards */}
      <div className="rebate-stats">
        <div className="stat-card-small pending">
          <div className="stat-icon">⏳</div>
          <div className="stat-info">
            <p>Pending Review</p>
            <h3>{stats.pending}</h3>
          </div>
        </div>
        <div className="stat-card-small approved">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <p>Approved</p>
            <h3>{stats.approved}</h3>
          </div>
        </div>
        <div className="stat-card-small paid">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <p>Paid</p>
            <h3>{stats.paid}</h3>
          </div>
        </div>
        <div className="stat-card-small total">
          <div className="stat-icon">💵</div>
          <div className="stat-info">
            <p>Total Amount</p>
            <h3>${stats.totalAmount.toLocaleString()}</h3>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="rebates-header">
        <div>
          <h1>IB Rebates</h1>
          <p>Manage monthly IB rebate calculations</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-secondary">
            <MdCalculate size={20} />
            <span>Calculate Rebates</span>
          </button>
          <button className="btn btn-primary" onClick={fetchRebates}>
            <MdRefresh size={20} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="rebates-filters">
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
          <option value="APPROVED">Approved</option>
          <option value="PAID">Paid</option>
        </select>

        <button className="btn btn-success">
          <MdFileDownload size={20} />
          <span>Export</span>
        </button>
      </div>

      {/* Results Info */}
      <div className="results-info">
        <p>Showing {filteredRebates.length} of {rebates.length} rebates</p>
      </div>

      {/* Rebates Table */}
      <div className="rebates-table-container">
        <table className="rebates-table">
          <thead>
            <tr>
              <th>Rebate ID</th>
              <th>IB Partner</th>
              <th>Period</th>
              <th>Total Lots</th>
              <th>Commission</th>
              <th>Rebate Rate</th>
              <th>Rebate Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRebates.length === 0 ? (
              <tr>
                <td colSpan="9" className="no-data">
                  No rebates found
                </td>
              </tr>
            ) : (
              filteredRebates.map((rebate) => (
                <tr key={rebate.id}>
                  <td>
                    <span className="rebate-id">#{rebate.id.substring(0, 8)}</span>
                  </td>
                  <td>
                    <div className="client-info-small">
                      <div className="client-name">{rebate.userName}</div>
                      <div className="client-email">{rebate.userEmail}</div>
                    </div>
                  </td>
                  <td>
                    <span className="period">{rebate.month}/{rebate.year}</span>
                  </td>
                  <td>
                    <span className="lots">{rebate.totalLots.toFixed(2)}</span>
                  </td>
                  <td>
                    <span className="commission">${rebate.totalCommission.toLocaleString()}</span>
                  </td>
                  <td>
                    <span className="rate">{rebate.rebateRate}%</span>
                  </td>
                  <td>
                    <span className="rebate-amount">${rebate.rebateAmount.toLocaleString()}</span>
                  </td>
                  <td>
                    <span className={`status-badge status-${rebate.status.toLowerCase()}`}>
                      {rebate.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-icon btn-view" 
                        title="View Details"
                        onClick={() => handleViewDetails(rebate)}
                      >
                        <MdVisibility size={18} />
                      </button>
                      {rebate.status === 'PENDING' && (
                        <button 
                          className="btn-icon btn-approve" 
                          title="Approve"
                          onClick={() => handleApprove(rebate.id)}
                        >
                          <MdCheckCircle size={18} />
                        </button>
                      )}
                      {rebate.status === 'APPROVED' && (
                        <button 
                          className="btn-icon btn-pay" 
                          title="Mark as Paid"
                        >
                          <MdAttachMoney size={18} />
                        </button>
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
      {showModal && selectedRebate && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Rebate Details</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="detail-row">
                <span className="detail-label">Rebate ID:</span>
                <span className="detail-value">#{selectedRebate.id.substring(0, 8)}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">IB Partner:</span>
                <span className="detail-value">{selectedRebate.userName}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Email:</span>
                <span className="detail-value">{selectedRebate.userEmail}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Period:</span>
                <span className="detail-value">{selectedRebate.month}/{selectedRebate.year}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Total Lots Traded:</span>
                <span className="detail-value">{selectedRebate.totalLots.toFixed(2)}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Total Commission:</span>
                <span className="detail-value">${selectedRebate.totalCommission.toLocaleString()}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Rebate Rate:</span>
                <span className="detail-value">{selectedRebate.rebateRate}%</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Rebate Amount:</span>
                <span className="detail-value amount">${selectedRebate.rebateAmount.toLocaleString()}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Status:</span>
                <span className={`status-badge status-${selectedRebate.status.toLowerCase()}`}>
                  {selectedRebate.status}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Calculated At:</span>
                <span className="detail-value">{selectedRebate.calculatedAt?.toLocaleString()}</span>
              </div>
              {selectedRebate.status === 'APPROVED' && selectedRebate.approvedAt && (
                <div className="detail-row">
                  <span className="detail-label">Approved At:</span>
                  <span className="detail-value">{selectedRebate.approvedAt.toLocaleString()}</span>
                </div>
              )}
              {selectedRebate.status === 'PAID' && selectedRebate.paidAt && (
                <div className="detail-row">
                  <span className="detail-label">Paid At:</span>
                  <span className="detail-value">{selectedRebate.paidAt.toLocaleString()}</span>
                </div>
              )}
            </div>
            {selectedRebate.status === 'PENDING' && (
              <div className="modal-footer">
                <button 
                  className="btn btn-success"
                  onClick={() => handleApprove(selectedRebate.id)}
                >
                  <MdCheckCircle size={20} />
                  Approve Rebate
                </button>
              </div>
            )}
            {selectedRebate.status === 'APPROVED' && (
              <div className="modal-footer">
                <button className="btn btn-primary">
                  <MdAttachMoney size={20} />
                  Mark as Paid
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}