import React, { useState } from 'react';
import { 
  MdFileDownload, 
  MdRefresh,
  MdShowChart,
  MdAssessment,
  MdDateRange
} from 'react-icons/md';
import './ReportsList.css';

export default function ReportsList() {
  const [dateRange, setDateRange] = useState({
    from: '',
    to: ''
  });

  const reportTypes = [
    {
      id: 'daily-summary',
      title: 'Daily Summary Report',
      description: 'Daily deposits, withdrawals, and trading activity',
      icon: '📊',
      color: '#3b82f6'
    },
    {
      id: 'client-activity',
      title: 'Client Activity Report',
      description: 'Detailed client trading and transaction history',
      icon: '👥',
      color: '#8b5cf6'
    },
    {
      id: 'ib-performance',
      title: 'IB Performance Report',
      description: 'IB partner performance and rebate summary',
      icon: '🎯',
      color: '#10b981'
    },
    {
      id: 'financial-summary',
      title: 'Financial Summary',
      description: 'Complete financial overview with P&L',
      icon: '💰',
      color: '#f59e0b'
    },
    {
      id: 'kyc-compliance',
      title: 'KYC Compliance Report',
      description: 'KYC verification status and compliance tracking',
      icon: '✅',
      color: '#06b6d4'
    },
    {
      id: 'risk-report',
      title: 'Risk Analysis Report',
      description: 'Risk exposure and margin utilization',
      icon: '⚠️',
      color: '#ef4444'
    },
    {
      id: 'wallet-transactions',
      title: 'Wallet Transactions Report',
      description: 'All wallet credits, debits, and balances',
      icon: '💳',
      color: '#ec4899'
    },
    {
      id: 'commission-report',
      title: 'Commission Report',
      description: 'Trading commissions and platform earnings',
      icon: '💵',
      color: '#14b8a6'
    }
  ];

  const handleGenerateReport = (reportId) => {
    if (!dateRange.from || !dateRange.to) {
      alert('Please select date range!');
      return;
    }
    alert(`Generating ${reportId} report for ${dateRange.from} to ${dateRange.to}...`);
  };

  const handleQuickReport = (days) => {
    const to = new Date();
    const from = new Date();
    from.setDate(from.getDate() - days);
    
    setDateRange({
      from: from.toISOString().split('T')[0],
      to: to.toISOString().split('T')[0]
    });
  };

  return (
    <div className="reports-container">
      {/* Header */}
      <div className="reports-header">
        <div>
          <h1>Reports & Analytics</h1>
          <p>Generate comprehensive business reports</p>
        </div>
        <button className="btn btn-primary">
          <MdRefresh size={20} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Date Range Selector */}
      <div className="date-range-section">
        <div className="date-range-card">
          <div className="card-header">
            <MdDateRange size={24} />
            <h2>Select Date Range</h2>
          </div>
          <div className="date-inputs">
            <div className="date-input-group">
              <label>From Date</label>
              <input
                type="date"
                value={dateRange.from}
                onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
              />
            </div>
            <div className="date-input-group">
              <label>To Date</label>
              <input
                type="date"
                value={dateRange.to}
                onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
              />
            </div>
          </div>
          <div className="quick-filters">
            <button className="quick-btn" onClick={() => handleQuickReport(7)}>
              Last 7 Days
            </button>
            <button className="quick-btn" onClick={() => handleQuickReport(30)}>
              Last 30 Days
            </button>
            <button className="quick-btn" onClick={() => handleQuickReport(90)}>
              Last 3 Months
            </button>
            <button className="quick-btn" onClick={() => handleQuickReport(365)}>
              Last Year
            </button>
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="reports-grid">
        {reportTypes.map((report) => (
          <div key={report.id} className="report-card">
            <div className="report-icon" style={{ backgroundColor: report.color + '20' }}>
              <span style={{ fontSize: '2rem' }}>{report.icon}</span>
            </div>
            <div className="report-info">
              <h3>{report.title}</h3>
              <p>{report.description}</p>
            </div>
            <div className="report-actions">
              <button 
                className="btn btn-secondary btn-small"
                onClick={() => handleGenerateReport(report.id)}
              >
                <MdShowChart size={16} />
                <span>Generate</span>
              </button>
              <button 
                className="btn btn-success btn-small"
                onClick={() => handleGenerateReport(report.id)}
              >
                <MdFileDownload size={16} />
                <span>Download</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="quick-stats-section">
        <h2>Quick Statistics</h2>
        <div className="quick-stats-grid">
          <div className="quick-stat-card">
            <div className="stat-icon">📈</div>
            <div className="stat-content">
              <p className="stat-label">Total Reports Generated</p>
              <h3 className="stat-value">156</h3>
              <p className="stat-change positive">+12% this month</p>
            </div>
          </div>
          <div className="quick-stat-card">
            <div className="stat-icon">⏱️</div>
            <div className="stat-content">
              <p className="stat-label">Avg. Generation Time</p>
              <h3 className="stat-value">2.3s</h3>
              <p className="stat-change positive">-0.5s faster</p>
            </div>
          </div>
          <div className="quick-stat-card">
            <div className="stat-icon">📥</div>
            <div className="stat-content">
              <p className="stat-label">Downloads This Month</p>
              <h3 className="stat-value">432</h3>
              <p className="stat-change positive">+8% from last month</p>
            </div>
          </div>
          <div className="quick-stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-content">
              <p className="stat-label">Most Popular Report</p>
              <h3 className="stat-value">Daily Summary</h3>
              <p className="stat-change">45% of all downloads</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="recent-reports-section">
        <h2>Recently Generated Reports</h2>
        <div className="recent-reports-list">
          <div className="recent-report-item">
            <div className="report-item-icon">📊</div>
            <div className="report-item-info">
              <h4>Daily Summary Report</h4>
              <p>Generated on Nov 20, 2024 at 10:30 AM</p>
            </div>
            <div className="report-item-meta">
              <span className="file-size">2.4 MB</span>
              <button className="btn-icon btn-download">
                <MdFileDownload size={18} />
              </button>
            </div>
          </div>
          <div className="recent-report-item">
            <div className="report-item-icon">👥</div>
            <div className="report-item-info">
              <h4>Client Activity Report</h4>
              <p>Generated on Nov 19, 2024 at 3:15 PM</p>
            </div>
            <div className="report-item-meta">
              <span className="file-size">5.1 MB</span>
              <button className="btn-icon btn-download">
                <MdFileDownload size={18} />
              </button>
            </div>
          </div>
          <div className="recent-report-item">
            <div className="report-item-icon">🎯</div>
            <div className="report-item-info">
              <h4>IB Performance Report</h4>
              <p>Generated on Nov 18, 2024 at 11:00 AM</p>
            </div>
            <div className="report-item-meta">
              <span className="file-size">1.8 MB</span>
              <button className="btn-icon btn-download">
                <MdFileDownload size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}