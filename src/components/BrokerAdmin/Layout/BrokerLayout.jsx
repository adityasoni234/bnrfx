import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  MdDashboard, 
  MdPeople, 
  MdAccountBalance,
  MdAttachMoney,
  MdTrendingUp,
  MdTrendingDown,
  MdVerifiedUser,
  MdCardGiftcard,
  MdPayment,
  MdWarning,
  MdBarChart,
  MdSupport,
  MdSettings,
  MdExitToApp,
  MdMenu,
  MdClose,
  MdNotifications,
  MdShield,
  MdShowChart,
  MdCreditCard
} from 'react-icons/md';
import './BrokerLayout.css';

export default function BrokerLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: MdDashboard, label: 'Dashboard', path: '/broker-admin/dashboard' },
    { icon: MdPeople, label: 'Clients', path: '/broker-admin/clients' },
    { icon: MdAccountBalance, label: 'IB Management', path: '/broker-admin/ib-management' },
    { icon: MdAttachMoney, label: 'Wallets', path: '/broker-admin/wallets' },
    { icon: MdTrendingDown, label: 'Deposits', path: '/broker-admin/deposits' },
    { icon: MdTrendingUp, label: 'Withdrawals', path: '/broker-admin/withdrawals' },
    { icon: MdVerifiedUser, label: 'KYC Queue', path: '/broker-admin/kyc' },
    { icon: MdCardGiftcard, label: 'Rebates', path: '/broker-admin/rebates' },
    { icon: MdPayment, label: 'Payouts', path: '/broker-admin/payouts' },
    { icon: MdWarning, label: 'Risk Monitor', path: '/broker-admin/risk' },
    { icon: MdBarChart, label: 'Reports', path: '/broker-admin/reports' },
    { icon: MdSupport, label: 'Support Tickets', path: '/broker-admin/tickets' },
    { icon: MdShowChart, label: 'MT5 Clients', path: '/broker-admin/mt5-clients' },
    { icon: MdCreditCard, label: 'Payment Settings', path: '/broker-admin/payment-settings' },
    { icon: MdSettings, label: 'Settings', path: '/broker-admin/settings' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('isBrokerAuthenticated');
    localStorage.removeItem('brokerAdmin');
    navigate('/broker-admin/login');
  };

  return (
    <div className="broker-layout">
      {/* Sidebar */}
      <aside className={`broker-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        {/* Logo */}
        <div className="sidebar-header">
          <div className="sidebar-logo-container">
            <img src="/logo.jpeg" alt="Logo" className={sidebarOpen ? "sidebar-logo-img" : "sidebar-logo-img-mini"} />
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="sidebar-toggle-btn"
          >
            {sidebarOpen ? <MdClose size={20} /> : <MdMenu size={20} />}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-menu-item ${isActive ? 'active' : ''}`}
              >
                <Icon size={20} />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            <MdExitToApp size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="broker-main-content">
        {/* Top Header */}
        <header className="broker-header">
          <div className="header-title">
            <h2>
              {menuItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
            </h2>
            <p>Broker Owner Panel</p>
          </div>
          
          <div className="header-actions">
            <button className="notification-btn">
              <MdNotifications size={24} />
              <span className="notification-badge"></span>
            </button>
            
            <div className="admin-badge">
              <MdShield size={20} />
              <span>Super Admin</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="broker-page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}