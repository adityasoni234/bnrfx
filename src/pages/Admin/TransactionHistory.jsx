import React, { useState, useEffect } from 'react';
import { FiSearch, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import '../../styles/Admin/TransactionHistory.css';
import { getCurrentUser, getUserTransactions } from '../../lib/supabase/helpers';

function TransactionHistory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All Types');
  const [filterStatus, setFilterStatus] = useState('All Statuses');
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      
      const user = await getCurrentUser();
      if (!user) {
        console.log('No user logged in');
        setLoading(false);
        return;
      }

      setCurrentUser(user);

      // Get all transactions
      const userTransactions = await getUserTransactions(user.user.id, 100);
      setTransactions(userTransactions || []);

    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'All Types' || 
      transaction.transaction_type.toLowerCase() === filterType.toLowerCase();
    
    // For status, we'll use a simple approach since transactions don't have explicit status
    const matchesStatus = filterStatus === 'All Statuses' || filterStatus === 'Completed';
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getTypeColor = (type) => {
    const colors = {
      'deposit': '#10b981',
      'withdrawal': '#ef4444',
      'commission': '#6366f1',
      'rebate': '#f59e0b',
      'transfer': '#8b5cf6',
      'adjustment': '#6b7280'
    };
    return colors[type.toLowerCase()] || '#6b7280';
  };

  const getTypeBadge = (type) => {
    const color = getTypeColor(type);
    return (
      <span style={{
        padding: '4px 12px',
        borderRadius: '12px',
        fontSize: '12px',
        backgroundColor: color + '20',
        color: color,
        fontWeight: '600',
        textTransform: 'uppercase'
      }}>
        {type}
      </span>
    );
  };

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransactions = filteredTransactions.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="transaction-history-page">
        <div className="loading" style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '50vh',
          fontSize: '18px'
        }}>
          Loading transactions...
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="transaction-history-page">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '50vh',
          flexDirection: 'column',
          gap: '20px'
        }}>
          <h2>Please login to view transactions</h2>
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
    <div className="transaction-history-page">
      <div className="transaction-header">
        <div>
          <h1>Transaction History</h1>
          <p>View, search, and filter your past transactions.</p>
        </div>
      </div>

      <div className="transaction-container">
        {/* Filters */}
        <div className="transaction-filters">
          <div className="search-box">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by ID or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="filter-select"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option>All Types</option>
            <option>Deposit</option>
            <option>Withdrawal</option>
            <option>Commission</option>
            <option>Rebate</option>
            <option>Transfer</option>
            <option>Adjustment</option>
          </select>

          <select
            className="filter-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option>All Statuses</option>
            <option>Completed</option>
          </select>
        </div>

        {/* Transaction Table */}
        <div className="transaction-table-container">
          <table className="transaction-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>TYPE</th>
                <th>AMOUNT</th>
                <th>BALANCE BEFORE</th>
                <th>BALANCE AFTER</th>
                <th>DATE</th>
                <th>DESCRIPTION</th>
              </tr>
            </thead>
            <tbody>
              {currentTransactions.length > 0 ? (
                currentTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td style={{ fontSize: '12px', fontFamily: 'monospace' }}>
                      {transaction.id.substring(0, 8)}...
                    </td>
                    <td>{getTypeBadge(transaction.transaction_type)}</td>
                    <td 
                      className="amount" 
                      style={{ 
                        color: ['deposit', 'commission', 'rebate'].includes(transaction.transaction_type.toLowerCase()) 
                          ? '#10b981' 
                          : '#ef4444',
                        fontWeight: '600'
                      }}
                    >
                      {['deposit', 'commission', 'rebate'].includes(transaction.transaction_type.toLowerCase()) ? '+' : '-'}
                      ${parseFloat(transaction.amount).toFixed(2)}
                    </td>
                    <td>${parseFloat(transaction.balance_before || 0).toFixed(2)}</td>
                    <td>${parseFloat(transaction.balance_after || 0).toFixed(2)}</td>
                    <td>{new Date(transaction.created_at).toLocaleString()}</td>
                    <td>{transaction.description || 'N/A'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="no-data">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination">
          <span className="pagination-info">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredTransactions.length)} of {filteredTransactions.length} entries
          </span>
          <div className="pagination-controls">
            <button 
              className="pagination-btn" 
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <FiChevronLeft />
            </button>
            <span style={{ margin: '0 10px' }}>
              Page {currentPage} of {totalPages || 1}
            </span>
            <button 
              className="pagination-btn"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionHistory;