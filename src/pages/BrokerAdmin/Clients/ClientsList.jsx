import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  MdSearch, 
  MdAdd, 
  MdFileDownload, 
  MdVisibility, 
  MdBlock, 
  MdCheckCircle 
} from 'react-icons/md';
import './ClientsList.css';
import { getAllClientsForBroker, updateClientStatus } from '../../../lib/supabase/helpers';

export default function ClientsList() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const data = await getAllClientsForBroker();
      console.log('Fetched clients:', data);
      const formattedClients = data.map(client => ({
        id: client.id,
        name: `${client.first_name} ${client.last_name}`,
        email: client.email  || 'NOT_SUBMITTED',
        phone: client.phone || 'NOT_SUBMITTED',
        role: client.role.toUpperCase(),
        status: client.status?.toUpperCase() || 'ACTIVE',
        kycStatus: client.kyc_status?.toUpperCase() || 'PENDING',
        balance: client.wallets?.[0]?.total_balance || 0,
        mt5Login: client.mt5_accounts?.length > 0 
          ? client.mt5_accounts
          : 'NOT_SUBMITTED',
        createdAt: new Date(client.created_at)
      }));

      setClients(formattedClients);
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBlock = async (clientId) => {
    if (window.confirm('Are you sure you want to block this client?')) {
      try {
        await updateClientStatus(clientId, 'blocked');
        await fetchClients();
        alert('Client blocked successfully!');
      } catch (error) {
        console.error('Error blocking client:', error);
        alert('Failed to block client');
      }
    }
  };

  const handleUnblock = async (clientId) => {
    try {
      await updateClientStatus(clientId, 'active');
      await fetchClients();
      alert('Client unblocked successfully!');
    } catch (error) {
      console.error('Error unblocking client:', error);
      alert('Failed to unblock client');
    }
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'ALL' || client.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading clients...</p>
      </div>
    );
  }

  return (
    <div className="clients-container">
      {/* Header */}
      <div className="clients-header">
        <div>
          <h1>Clients Management</h1>
          <p>Manage all your trading clients</p>
        </div>
        <button className="btn btn-primary">
          <MdAdd size={20} />
          <span>Add Client</span>
        </button>
      </div>

      {/* Filters */}
      <div className="clients-filters">
        <div className="search-box">
          <MdSearch size={20} />
          <input
            type="text"
            placeholder="Search by name, email, phone..."
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
          <option value="ACTIVE">Active</option>
          <option value="SUSPENDED">Suspended</option>
          <option value="BLOCKED">Blocked</option>
          <option value="PENDING">Pending</option>
        </select>

        <button className="btn btn-success">
          <MdFileDownload size={20} />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Results Count */}
      <div className="results-info">
        <p>Showing {filteredClients.length} of {clients.length} clients</p>
      </div>

      {/* Clients Table */}
      <div className="clients-table-container">
        <table className="clients-table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Contact</th>
              <th>MT5 Login</th>
              <th>Balance</th>
              <th>KYC Status</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.length === 0 ? (
              <tr>
                <td colSpan="8" className="no-data">
                  No clients found
                </td>
              </tr>
            ) : (
              filteredClients.map((client) => (
                <tr key={client.id}>
                  <td>
                    <div className="client-info">
                      <div className="client-avatar">
                        {client.name.charAt(0)}
                      </div>
                      <div>
                        <div className="client-name">{client.name}</div>
                        <div className="client-email">{client.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{client.phone}</td>
                  <td style={{ maxWidth: '200px', wordBreak: 'break-word' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                      {client.mt5Login !== "NOT_SUBMITTED" && client.mt5Login.length > 0 ? client.mt5Login.map(login => (
                        <span key={login.id} className="mt5-badge">{login.login_id}</span>
                      )) : <span className="mt5-badge">NOT_SUBMITTED</span>}
                    </div>
                  </td>
                  <td>
                    <span className="balance">${client.balance.toLocaleString()}</span>
                  </td>
                  <td>
                    <span className={`status-badge kyc-${client.kycStatus.toLowerCase()}`}>
                      {client.kycStatus}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge status-${client.status.toLowerCase()}`}>
                      {client.status}
                    </span>
                  </td>
                  <td>{client.createdAt.toLocaleDateString()}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-icon btn-view" 
                        title="View Details"
                      >
                        <MdVisibility size={18} />
                      </button>
                      {client.status === 'ACTIVE' || client.status === 'SUSPENDED' ? (
                        <button 
                          className="btn-icon btn-block" 
                          title="Block Client"
                          onClick={() => handleBlock(client.id)}
                        >
                          <MdBlock size={18} />
                        </button>
                      ) : (
                        <button 
                          className="btn-icon btn-unblock" 
                          title="Unblock Client"
                          onClick={() => handleUnblock(client.id)}
                        >
                          <MdCheckCircle size={18} />
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
    </div>
  );
}