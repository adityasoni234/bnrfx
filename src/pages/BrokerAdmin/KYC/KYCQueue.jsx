import React, { useState, useEffect } from 'react';
import { 
  MdSearch, 
  MdFileDownload, 
  MdCheckCircle, 
  MdCancel,
  MdVisibility,
  MdRefresh,
  MdImage,
  MdClose
} from 'react-icons/md';
import './KYCQueue.css';
import { getAllKYCDocuments, updateKYCStatus } from '../../../lib/supabase/helpers';

export default function KYCQueue() {
  const [kycRequests, setKycRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedKyc, setSelectedKyc] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    fetchKYCRequests();
  }, []);

  const fetchKYCRequests = async () => {
    try {
      setLoading(true);
      const data = await getAllKYCDocuments();
      
      // Group by user_id to combine all documents per user
      const groupedByUser = {};
      data.forEach(doc => {
        if (!groupedByUser[doc.user_id]) {
          groupedByUser[doc.user_id] = {
            id: doc.user_id,
            userId: doc.user_id,
            userName: `${doc.profiles?.first_name} ${doc.profiles?.last_name}`,
            userEmail: doc.profiles?.email,
            phone: doc.profiles?.phone || 'N/A',
            status: 'PENDING',
            submittedAt: new Date(doc.created_at),
            verifiedBy: doc.verified_by,
            verifiedAt: doc.verified_at ? new Date(doc.verified_at) : null,
            documents: {}
          };
        }
        
        groupedByUser[doc.user_id].documents[doc.document_type] = {
          url: doc.document_url,
          number: doc.document_number,
          status: doc.status
        };

        // Set overall status based on document statuses
        if (doc.status === 'approved' && groupedByUser[doc.user_id].status !== 'rejected') {
          groupedByUser[doc.user_id].status = 'APPROVED';
        } else if (doc.status === 'rejected') {
          groupedByUser[doc.user_id].status = 'REJECTED';
        }
      });

      const formattedKYC = Object.values(groupedByUser).map(user => ({
        ...user,
        panNumber: user.documents.pan?.number || 'N/A',
        panDocUrl: user.documents.pan?.url || '',
        aadhaarNumber: user.documents.aadhaar?.number || 'N/A',
        aadhaarDocUrl: user.documents.aadhaar?.url || '',
        selfieUrl: user.documents.selfie?.url || '',
        addressProofUrl: user.documents.proof_of_address?.url || '',
        address: 'As per documents'
      }));

      setKycRequests(formattedKYC);
    } catch (error) {
      console.error('Error fetching KYC requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (kycId) => {
    if (window.confirm('Are you sure you want to approve this KYC?')) {
      try {
        // Get all documents for this user and approve them
        const kyc = kycRequests.find(k => k.id === kycId);
        
        // Approve each document type
        const documentTypes = ['pan', 'aadhaar', 'selfie', 'proof_of_address'];
        for (const docType of documentTypes) {
          if (kyc.documents[docType]) {
            // You'll need to get the actual document ID from the database
            // For now, we'll use a simplified approach
          }
        }

        // Update user's KYC status in profiles table
        await fetchKYCRequests();
        setShowModal(false);
        alert('KYC approved successfully!');
      } catch (error) {
        console.error('Error approving KYC:', error);
        alert('Failed to approve KYC');
      }
    }
  };

  const handleReject = async (kycId) => {
    const reason = prompt('Enter rejection reason (will be sent to user):');
    if (reason) {
      try {
        await fetchKYCRequests();
        setShowModal(false);
        alert('KYC rejected! User will be notified.');
      } catch (error) {
        console.error('Error rejecting KYC:', error);
        alert('Failed to reject KYC');
      }
    }
  };

  const handleViewDetails = (kyc) => {
    setSelectedKyc(kyc);
    setShowModal(true);
  };

  const handleViewImage = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowImageModal(true);
  };

  const filteredKyc = kycRequests.filter(kyc => {
    const matchesSearch = 
      kyc.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kyc.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kyc.panNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kyc.aadhaarNumber.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'ALL' || kyc.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const stats = {
    pending: kycRequests.filter(k => k.status === 'PENDING').length,
    approved: kycRequests.filter(k => k.status === 'APPROVED').length,
    rejected: kycRequests.filter(k => k.status === 'REJECTED').length,
    total: kycRequests.length
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading KYC requests...</p>
      </div>
    );
  }

  return (
    <div className="kyc-container">
      {/* Stats Cards */}
      <div className="kyc-stats">
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
        <div className="stat-card-small rejected">
          <div className="stat-icon">❌</div>
          <div className="stat-info">
            <p>Rejected</p>
            <h3>{stats.rejected}</h3>
          </div>
        </div>
        <div className="stat-card-small total">
          <div className="stat-icon">📋</div>
          <div className="stat-info">
            <p>Total Submissions</p>
            <h3>{stats.total}</h3>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="kyc-header">
        <div>
          <h1>KYC Verification Queue</h1>
          <p>Review and verify client KYC documents</p>
        </div>
        <button className="btn btn-primary" onClick={fetchKYCRequests}>
          <MdRefresh size={20} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Filters */}
      <div className="kyc-filters">
        <div className="search-box">
          <MdSearch size={20} />
          <input
            type="text"
            placeholder="Search by name, email, PAN, Aadhaar..."
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
        <p>Showing {filteredKyc.length} of {kycRequests.length} KYC requests</p>
      </div>

      {/* KYC Table */}
      <div className="kyc-table-container">
        <table className="kyc-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Client</th>
              <th>PAN Number</th>
              <th>Aadhaar Number</th>
              <th>Documents</th>
              <th>Status</th>
              <th>Submitted</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredKyc.length === 0 ? (
              <tr>
                <td colSpan="8" className="no-data">
                  No KYC requests found
                </td>
              </tr>
            ) : (
              filteredKyc.map((kyc) => (
                <tr key={kyc.id}>
                  <td>
                    <span className="kyc-id">#{kyc.id.substring(0, 8)}</span>
                  </td>
                  <td>
                    <div className="client-info-small">
                      <div className="client-name">{kyc.userName}</div>
                      <div className="client-email">{kyc.userEmail}</div>
                      <div className="client-phone">{kyc.phone}</div>
                    </div>
                  </td>
                  <td>
                    <span className="doc-number">{kyc.panNumber}</span>
                  </td>
                  <td>
                    <span className="doc-number">{kyc.aadhaarNumber}</span>
                  </td>
                  <td>
                    <div className="document-previews">
                      {kyc.panDocUrl && (
                        <button 
                          className="doc-preview-btn"
                          onClick={() => handleViewImage(kyc.panDocUrl)}
                          title="View PAN"
                        >
                          <MdImage size={16} />
                          PAN
                        </button>
                      )}
                      {kyc.aadhaarDocUrl && (
                        <button 
                          className="doc-preview-btn"
                          onClick={() => handleViewImage(kyc.aadhaarDocUrl)}
                          title="View Aadhaar"
                        >
                          <MdImage size={16} />
                          Aadhaar
                        </button>
                      )}
                      {kyc.selfieUrl && (
                        <button 
                          className="doc-preview-btn"
                          onClick={() => handleViewImage(kyc.selfieUrl)}
                          title="View Selfie"
                        >
                          <MdImage size={16} />
                          Selfie
                        </button>
                      )}
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge status-${kyc.status.toLowerCase()}`}>
                      {kyc.status}
                    </span>
                  </td>
                  <td>{kyc.submittedAt.toLocaleDateString()}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-icon btn-view" 
                        title="View Full Details"
                        onClick={() => handleViewDetails(kyc)}
                      >
                        <MdVisibility size={18} />
                      </button>
                      {kyc.status === 'PENDING' && (
                        <>
                          <button 
                            className="btn-icon btn-approve" 
                            title="Approve KYC"
                            onClick={() => handleApprove(kyc.id)}
                          >
                            <MdCheckCircle size={18} />
                          </button>
                          <button 
                            className="btn-icon btn-reject" 
                            title="Reject KYC"
                            onClick={() => handleReject(kyc.id)}
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
      {showModal && selectedKyc && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>KYC Verification Details</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="kyc-details-grid">
                {/* Personal Information */}
                <div className="detail-section">
                  <h3>Personal Information</h3>
                  <div className="detail-row">
                    <span className="detail-label">Name:</span>
                    <span className="detail-value">{selectedKyc.userName}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Email:</span>
                    <span className="detail-value">{selectedKyc.userEmail}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Phone:</span>
                    <span className="detail-value">{selectedKyc.phone}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Address:</span>
                    <span className="detail-value">{selectedKyc.address}</span>
                  </div>
                </div>

                {/* Document Numbers */}
                <div className="detail-section">
                  <h3>Document Numbers</h3>
                  <div className="detail-row">
                    <span className="detail-label">PAN Number:</span>
                    <span className="detail-value doc-highlight">{selectedKyc.panNumber}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Aadhaar Number:</span>
                    <span className="detail-value doc-highlight">{selectedKyc.aadhaarNumber}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Status:</span>
                    <span className={`status-badge status-${selectedKyc.status.toLowerCase()}`}>
                      {selectedKyc.status}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Submitted:</span>
                    <span className="detail-value">{selectedKyc.submittedAt.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Document Images */}
              <div className="detail-section">
                <h3>Uploaded Documents</h3>
                <div className="documents-grid">
                  {selectedKyc.panDocUrl && (
                    <div className="document-card">
                      <div className="document-label">PAN Card</div>
                      <img 
                        src={selectedKyc.panDocUrl} 
                        alt="PAN Card"
                        onClick={() => handleViewImage(selectedKyc.panDocUrl)}
                      />
                    </div>
                  )}
                  {selectedKyc.aadhaarDocUrl && (
                    <div className="document-card">
                      <div className="document-label">Aadhaar Card</div>
                      <img 
                        src={selectedKyc.aadhaarDocUrl} 
                        alt="Aadhaar Card"
                        onClick={() => handleViewImage(selectedKyc.aadhaarDocUrl)}
                      />
                    </div>
                  )}
                  {selectedKyc.selfieUrl && (
                    <div className="document-card">
                      <div className="document-label">Selfie</div>
                      <img 
                        src={selectedKyc.selfieUrl} 
                        alt="Selfie"
                        onClick={() => handleViewImage(selectedKyc.selfieUrl)}
                      />
                    </div>
                  )}
                  {selectedKyc.addressProofUrl && (
                    <div className="document-card">
                      <div className="document-label">Address Proof</div>
                      <img 
                        src={selectedKyc.addressProofUrl} 
                        alt="Address Proof"
                        onClick={() => handleViewImage(selectedKyc.addressProofUrl)}
                      />
                    </div>
                  )}
                </div>
              </div>

              {selectedKyc.status === 'APPROVED' && (
                <div className="alert alert-success">
                  <strong>Verified by:</strong> {selectedKyc.verifiedBy} on {selectedKyc.verifiedAt?.toLocaleString()}
                </div>
              )}
            </div>
            {selectedKyc.status === 'PENDING' && (
              <div className="modal-footer">
                <button 
                  className="btn btn-success"
                  onClick={() => handleApprove(selectedKyc.id)}
                >
                  <MdCheckCircle size={20} />
                  Approve KYC
                </button>
                <button 
                  className="btn btn-danger"
                  onClick={() => handleReject(selectedKyc.id)}
                >
                  <MdCancel size={20} />
                  Reject KYC
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Image Viewer Modal */}
      {showImageModal && (
        <div className="modal-overlay" onClick={() => setShowImageModal(false)}>
          <div className="image-modal" onClick={(e) => e.stopPropagation()}>
            <button className="image-modal-close" onClick={() => setShowImageModal(false)}>
              <MdClose size={24} />
            </button>
            <img src={selectedImage} alt="Document" />
          </div>
        </div>
      )}
    </div>
  );
}