import React, { useState, useEffect } from 'react';
import { 
  MdSearch, 
  MdFileDownload, 
  MdAccountBalanceWallet,
  MdAdd,
  MdRemove,
  MdRefresh,
  MdVisibility
} from 'react-icons/md';
import './WalletsList.css';
import { getAllWallets } from '../../../lib/supabase/helpers';

export default function WalletsList() {
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState(null);

  useEffect(() => {
    fetchWallets();
  }, []);

  const fetchWallets = async () => {
    try {
      setLoading(true);
      const data = await getAllWallets();
      
      const formattedWallets = data.map(wallet => ({
        id: wallet.id,
        userId: wallet.user_id,
        userName: `${wallet.profiles?.first_name} ${wallet.profiles?.last_name}`,
        userEmail: wallet.profiles?.email,
        currency: wallet.currency || 'INR',
        availableBalance: parseFloat(wallet.available_balance || 0),
        lockedBalance: parseFloat(wallet.locked_balance || 0),
        totalBalance: parseFloat(wallet.total_balance || 0),
        lastTransaction: wallet.last_transaction_at ? new Date(wallet.last_transaction_at) : null,
        status: 'ACTIVE'
      }));

      setWallets(formattedWallets);
    } catch (error) {
      console.error('Error fetching wallets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (wallet) => {
    setSelectedWallet(wallet);
    setShowModal(true);
  };

  const filteredWallets = wallets.filter(wallet => {
    const matchesSearch = 
      wallet.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wallet.userEmail.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  const totalStats = {
    totalWallets: wallets.length,
    totalBalance: wallets.reduce((sum, w) => sum + w.totalBalance, 0),
    totalAvailable: wallets.reduce((sum, w) => sum + w.availableBalance, 0),
    totalLocked: wallets.reduce((sum, w) => sum + w.lockedBalance, 0)
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading wallets...</p>
      </div>
    );
  }

  return (
    <div className="wallets-container">
      {/* Stats Cards */}
      <div className="wallet-stats">
        <div className="stat-card-small total">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <p>Total Wallets</p>
            <h3>{totalStats.totalWallets}</h3>
          </div>
        </div>
        <div className="stat-card-small balance">
          <div className="stat-icon">💵</div>
          <div className="stat-info">
            <p>Total Balance</p>
            <h3>${totalStats.totalBalance.toLocaleString()}</h3>
          </div>
        </div>
        <div className="stat-card-small available">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <p>Available Balance</p>
            <h3>${totalStats.totalAvailable.toLocaleString()}</h3>
          </div>
        </div>
        <div className="stat-card-small locked">
          <div className="stat-icon">🔒</div>
          <div className="stat-info">
            <p>Locked Balance</p>
            <h3>${totalStats.totalLocked.toLocaleString()}</h3>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="wallets-header">
        <div>
          <h1>Client Wallets</h1>
          <p>Manage client wallet balances</p>
        </div>
        <button className="btn btn-primary" onClick={fetchWallets}>
          <MdRefresh size={20} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Filters */}
      <div className="wallets-filters">
        <div className="search-box">
          <MdSearch size={20} />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button className="btn btn-success">
          <MdFileDownload size={20} />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Results Info */}
      <div className="results-info">
        <p>Showing {filteredWallets.length} of {wallets.length} wallets</p>
      </div>

      {/* Wallets Table */}
      <div className="wallets-table-container">
        <table className="wallets-table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Available Balance</th>
              <th>Locked Balance</th>
              <th>Total Balance</th>
              <th>Currency</th>
              <th>Last Transaction</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredWallets.length === 0 ? (
              <tr>
                <td colSpan="8" className="no-data">
                  No wallets found
                </td>
              </tr>
            ) : (
              filteredWallets.map((wallet) => (
                <tr key={wallet.id}>
                  <td>
                    <div className="client-info-small">
                      <div className="client-name">{wallet.userName}</div>
                      <div className="client-email">{wallet.userEmail}</div>
                    </div>
                  </td>
                  <td>
                    <span className="balance available">
                      ${wallet.availableBalance.toLocaleString()}
                    </span>
                  </td>
                  <td>
                    <span className="balance locked">
                      ${wallet.lockedBalance.toLocaleString()}
                    </span>
                  </td>
                  <td>
                    <span className="balance total">
                      ${wallet.totalBalance.toLocaleString()}
                    </span>
                  </td>
                  <td>
                    <span className="currency-badge">{wallet.currency}</span>
                  </td>
                  <td>{wallet.lastTransaction ? wallet.lastTransaction.toLocaleString() : 'Never'}</td>
                  <td>
                    <span className={`status-badge status-${wallet.status.toLowerCase()}`}>
                      {wallet.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-icon btn-view" 
                        title="View Details"
                        onClick={() => handleViewDetails(wallet)}
                      >
                        <MdVisibility size={18} />
                      </button>
                      <button 
                        className="btn-icon btn-credit" 
                        title="Credit"
                      >
                        <MdAdd size={18} />
                      </button>
                      <button 
                        className="btn-icon btn-debit" 
                        title="Debit"
                      >
                        <MdRemove size={18} />
                      </button>
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
      {showModal && selectedWallet && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Wallet Details</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="detail-row">
                <span className="detail-label">Client Name:</span>
                <span className="detail-value">{selectedWallet.userName}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Email:</span>
                <span className="detail-value">{selectedWallet.userEmail}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Available Balance:</span>
                <span className="detail-value balance">${selectedWallet.availableBalance.toLocaleString()}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Locked Balance:</span>
                <span className="detail-value balance">${selectedWallet.lockedBalance.toLocaleString()}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Total Balance:</span>
                <span className="detail-value balance">${selectedWallet.totalBalance.toLocaleString()}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Currency:</span>
                <span className="detail-value">{selectedWallet.currency}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Status:</span>
                <span className={`status-badge status-${selectedWallet.status.toLowerCase()}`}>
                  {selectedWallet.status}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Last Transaction:</span>
                <span className="detail-value">{selectedWallet.lastTransaction ? selectedWallet.lastTransaction.toLocaleString() : 'Never'}</span>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-success">
                <MdAdd size={20} />
                Credit Wallet
              </button>
              <button className="btn btn-danger">
                <MdRemove size={20} />
                Debit Wallet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}