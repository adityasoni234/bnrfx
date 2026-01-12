import React, { useState, useEffect } from 'react';
import { 
  MdSearch, 
  MdFileDownload, 
  MdVisibility,
  MdRefresh,
  MdPeople,
  MdTrendingUp
} from 'react-icons/md';
import './IBList.css';
import { getAllIBs } from '../../../lib/supabase/helpers';
import { supabase } from '../../../lib/supabase/client';

export default function IBList() {
  const [ibs, setIbs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');

  useEffect(() => {
    fetchIBs();
  }, []);

  const fetchIBs = async () => {
    try {
      setLoading(true);
      const data = await getAllIBs();
      
      const formattedIBs = await Promise.all(data.map(async (ib) => {
        // Get referred clients count
        const { data: referredClients } = await supabase
          .from('profiles')
          .select('id, status')
          .eq('referred_by', ib.id);

        const totalClients = referredClients?.length || 0;
        const activeClients = referredClients?.filter(c => c.status === 'active').length || 0;

        // Get total rebates (if rebates table exists)
        const { data: rebates } = await supabase
          .from('rebates')
          .select('amount')
          .eq('user_id', ib.id)
          .eq('status', 'approved');

        const totalRebates = rebates?.reduce((sum, r) => sum + parseFloat(r.amount), 0) || 0;

        return {
          id: ib.id,
          name: `${ib.first_name} ${ib.last_name}`,
          email: ib.email,
          phone: ib.phone || 'N/A',
          role: ib.role === 'super_master' ? 'SUPER_MASTER' : 'MASTER',
          parentId: ib.referred_by,
          parentName: null, // Would need to fetch if needed
          totalClients,
          activeClients,
          totalRebates,
          status: ib.status?.toUpperCase() || 'ACTIVE',
          createdAt: new Date(ib.created_at)
        };
      }));

      setIbs(formattedIBs);
    } catch (error) {
      console.error('Error fetching IBs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredIBs = ibs.filter(ib => {
    const matchesSearch = 
      ib.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ib.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === 'ALL' || ib.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  const stats = {
    totalIBs: ibs.length,
    masters: ibs.filter(ib => ib.role === 'MASTER').length,
    superMasters: ibs.filter(ib => ib.role === 'SUPER_MASTER').length,
    totalRebates: ibs.reduce((sum, ib) => sum + ib.totalRebates, 0)
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading IB partners...</p>
      </div>
    );
  }

  return (
    <div className="ib-container">
      {/* Stats Cards */}
      <div className="ib-stats">
        <div className="stat-card-small total">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <p>Total IBs</p>
            <h3>{stats.totalIBs}</h3>
          </div>
        </div>
        <div className="stat-card-small masters">
          <div className="stat-icon">🎯</div>
          <div className="stat-info">
            <p>Masters</p>
            <h3>{stats.masters}</h3>
          </div>
        </div>
        <div className="stat-card-small super-masters">
          <div className="stat-icon">⭐</div>
          <div className="stat-info">
            <p>Super Masters</p>
            <h3>{stats.superMasters}</h3>
          </div>
        </div>
        <div className="stat-card-small rebates">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <p>Total Rebates Paid</p>
            <h3>₹{stats.totalRebates.toLocaleString()}</h3>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="ib-header">
        <div>
          <h1>IB Management</h1>
          <p>Manage Introducing Brokers and their hierarchy</p>
        </div>
        <button className="btn btn-primary" onClick={fetchIBs}>
          <MdRefresh size={20} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Filters */}
      <div className="ib-filters">
        <div className="search-box">
          <MdSearch size={20} />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="filter-select"
        >
          <option value="ALL">All Roles</option>
          <option value="SUPER_MASTER">Super Master</option>
          <option value="MASTER">Master</option>
        </select>

        <button className="btn btn-success">
          <MdFileDownload size={20} />
          <span>Export</span>
        </button>
      </div>

      {/* Results Info */}
      <div className="results-info">
        <p>Showing {filteredIBs.length} of {ibs.length} IB partners</p>
      </div>

      {/* IB Table */}
      <div className="ib-table-container">
        <table className="ib-table">
          <thead>
            <tr>
              <th>IB Partner</th>
              <th>Role</th>
              <th>Parent IB</th>
              <th>Total Clients</th>
              <th>Active Clients</th>
              <th>Total Rebates</th>
              <th>Status</th>
              <th>Joined Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredIBs.length === 0 ? (
              <tr>
                <td colSpan="9" className="no-data">
                  No IB partners found
                </td>
              </tr>
            ) : (
              filteredIBs.map((ib) => (
                <tr key={ib.id}>
                  <td>
                    <div className="client-info-small">
                      <div className="client-name">{ib.name}</div>
                      <div className="client-email">{ib.email}</div>
                      <div className="client-phone">{ib.phone}</div>
                    </div>
                  </td>
                  <td>
                    <span className={`role-badge role-${ib.role.toLowerCase()}`}>
                      {ib.role === 'SUPER_MASTER' ? 'Super Master' : 'Master'}
                    </span>
                  </td>
                  <td>
                    {ib.parentName ? (
                      <span className="parent-name">{ib.parentName}</span>
                    ) : (
                      <span className="no-parent">Direct</span>
                    )}
                  </td>
                  <td>
                    <div className="client-count">
                      <MdPeople size={16} />
                      <span>{ib.totalClients}</span>
                    </div>
                  </td>
                  <td>
                    <div className="client-count active">
                      <MdTrendingUp size={16} />
                      <span>{ib.activeClients}</span>
                    </div>
                  </td>
                  <td>
                    <span className="rebate-amount">₹{ib.totalRebates.toLocaleString()}</span>
                  </td>
                  <td>
                    <span className={`status-badge status-${ib.status.toLowerCase()}`}>
                      {ib.status}
                    </span>
                  </td>
                  <td>{ib.createdAt.toLocaleDateString()}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon btn-view" title="View Details">
                        <MdVisibility size={18} />
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
    </div>
  );
}