import React from 'react';
import Sidebar from './Sidebar';
import '../../styles/Admin/AdminLayout.css';

function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;