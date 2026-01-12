import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FiHome,
  FiUser,
  FiDollarSign,
  FiUsers,
  FiUpload,
  FiList,
  FiFileText,
  FiDownload,
  FiBookOpen,
  FiChevronDown,
  FiClock,
  FiLink,
  FiUserPlus,
  FiMenu,
  FiX
} from 'react-icons/fi';
import '../../styles/Admin/Sidebar.css';

function Sidebar() {
  const location = useLocation();

  const [isIBRoomOpen, setIsIBRoomOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // ✅ mobile toggle

  const menuItems = [
    { path: '/admin/dashboard', icon: <FiHome />, label: 'Dashboard' },
    { path: '/admin/profile', icon: <FiUser />, label: 'Profile' },
    { path: '/admin/deposit', icon: <FiDollarSign />, label: 'Deposit' },
    { path: '/admin/live-account', icon: <FiUsers />, label: 'Live Account' },
    { path: '/admin/withdraw', icon: <FiUpload />, label: 'Withdraw' },
    { path: '/admin/transactions', icon: <FiList />, label: 'Transaction History' },
    { path: '/admin/support', icon: <FiFileText />, label: 'Support Tickets' },
    { path: '/admin/download', icon: <FiDownload />, label: 'Download' }
  ];

  const ibMenuItems = [
    { path: '/admin/ib-dashboard', icon: <FiClock />, label: 'IB Dashboard' },
    { path: '/admin/referral-links', icon: <FiLink />, label: 'Referral Links' },
    { path: '/admin/attracted-clients', icon: <FiUserPlus />, label: 'Attracted Clients' }
  ];

  const isActive = (path) => location.pathname === path;

  const closeSidebarOnMobile = () => {
    if (window.innerWidth <= 768) setIsSidebarOpen(false);
  };

  return (
    <>
      {/* ✅ Mobile hamburger (only shows on mobile via CSS) */}
      <button
        className="sidebar-mobile-toggle"
        onClick={() => setIsSidebarOpen(true)}
        aria-label="Open menu"
      >
        <FiMenu />
      </button>

      {/* ✅ Overlay */}
      <div
        className={`sidebar-overlay ${isSidebarOpen ? 'show' : ''}`}
        onClick={() => setIsSidebarOpen(false)}
      />

      <div className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        {/* ✅ Close button inside sidebar (mobile only) */}
        <div className="sidebar-mobile-header">
          <button
            className="sidebar-close-btn"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close menu"
          >
            <FiX />
          </button>
        </div>

        <div className="sidebar-logo">
          <img src="/logo.png" alt="StockVala" />
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              onClick={closeSidebarOnMobile}
              className={`sidebar-item ${isActive(item.path) ? 'active' : ''}`}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
            </Link>
          ))}

          {/* IB Room Dropdown */}
          <div className="sidebar-item-dropdown">
            <div
              className={`sidebar-item ${isIBRoomOpen ? 'active' : ''}`}
              onClick={() => setIsIBRoomOpen(!isIBRoomOpen)}
              role="button"
              tabIndex={0}
            >
              <span className="sidebar-icon"><FiBookOpen /></span>
              <span className="sidebar-label">IB Room</span>
              <span className={`dropdown-arrow ${isIBRoomOpen ? 'open' : ''}`}>
                <FiChevronDown />
              </span>
            </div>

            {isIBRoomOpen && (
              <div className="sidebar-dropdown">
                {ibMenuItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    onClick={closeSidebarOnMobile}
                    className={`dropdown-item ${isActive(item.path) ? 'active' : ''}`}
                  >
                    <span className="dropdown-icon">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}

export default Sidebar;
