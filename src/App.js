import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Website Pages
import Home from './pages/Website/Home';

// Admin Pages
import Login from './pages/Admin/Login';
import Register from './pages/Admin/Register';
import Dashboard from './pages/Admin/Dashboard';
import Profile from './pages/Admin/Profile';
import Deposit from './pages/Admin/Deposit';
import Withdraw from './pages/Admin/Withdraw';
import LiveAccount from './pages/Admin/LiveAccount';
import TransactionHistory from './pages/Admin/TransactionHistory';
import SupportTickets from './pages/Admin/SupportTickets';
import Download from './pages/Admin/Download';
import IBDashboard from './pages/Admin/IBDashboard';
import ReferralLinks from './pages/Admin/ReferralLinks';
import AttractedClients from './pages/Admin/AttractedClients';

// Broker Admin - Auth
import BrokerLogin from './pages/BrokerAdmin/Auth/Login';

// Broker Admin - Layout
import BrokerLayout from './components/BrokerAdmin/Layout/BrokerLayout';

// Broker Admin - Pages
import BrokerDashboard from './pages/BrokerAdmin/Dashboard/Dashboard';
import ClientsList from './pages/BrokerAdmin/Clients/ClientsList';
import DepositsList from './pages/BrokerAdmin/Deposits/DepositsList';
import WithdrawalsList from './pages/BrokerAdmin/Withdrawals/WithdrawalsList';
import KYCQueue from './pages/BrokerAdmin/KYC/KYCQueue';
import WalletsList from './pages/BrokerAdmin/Wallets/WalletsList';
import IBList from './pages/BrokerAdmin/IBManagement/IBList';
import RiskMonitor from './pages/BrokerAdmin/Risk/RiskMonitor';
import PayoutsList from './pages/BrokerAdmin/Payouts/PayoutsList';
import RebatesList from './pages/BrokerAdmin/Rebates/RebatesList';
import ReportsList from './pages/BrokerAdmin/Reports/ReportsList';
import TicketsList from './pages/BrokerAdmin/Tickets/TicketsList';
import SettingsPage from './pages/BrokerAdmin/Settings/SettingsPage';
import MT5Clients from './pages/BrokerAdmin/MT5Clients/MT5Clients';
import PaymentSettings from './pages/BrokerAdmin/PaymentSettings/PaymentSettings';

// Components
import Sidebar from './pages/Admin/Sidebar';

// Broker Protected Route Component (embedded)
function BrokerProtectedRoute({ children }) {
  const isBrokerAuthenticated = localStorage.getItem('isBrokerAuthenticated') === 'true';
  const brokerAdmin = localStorage.getItem('brokerAdmin');

  if (!isBrokerAuthenticated || !brokerAdmin) {
    console.log('❌ Broker not authenticated, redirecting to login');
    return <Navigate to="/broker-admin/login" replace />;
  }

  console.log('✅ Broker authenticated');
  return children;
}

function App() {
  return (
    <Routes>
      {/* BROKER ADMIN LOGIN - Public Route */}
      <Route path="/broker-admin/login" element={<BrokerLogin />} />

      {/* Website Home Page - Default Route */}
      <Route path="/" element={<Home />} />

      {/* Authentication Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin/login" element={<Login />} />

      {/* Admin Routes with Sidebar Layout */}
      <Route path="/admin/*" element={
        <div className="admin-layout">
          <Sidebar />
          <div className="admin-content">
            <Routes>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="profile" element={<Profile />} />
              <Route path="deposit" element={<Deposit />} />
              <Route path="withdraw" element={<Withdraw />} />
              <Route path="live-account" element={<LiveAccount />} />
              <Route path="transactions" element={<TransactionHistory />} />
              <Route path="support" element={<SupportTickets />} />
              <Route path="download" element={<Download />} />
              
              {/* IB Room Routes */}
              <Route path="ib-dashboard" element={<IBDashboard />} />
              <Route path="referral-links" element={<ReferralLinks />} />
              <Route path="attracted-clients" element={<AttractedClients />} />
              
              {/* Default redirect to dashboard */}
              <Route path="" element={<Navigate to="dashboard" replace />} />
            </Routes>
          </div>
        </div>
      } />

      {/* Broker Admin Routes - PROTECTED */}
      <Route path="/broker-admin" element={
        <BrokerProtectedRoute>
          <BrokerLayout />
        </BrokerProtectedRoute>
      }>
        <Route index element={<Navigate to="/broker-admin/dashboard" replace />} />
        <Route path="dashboard" element={<BrokerDashboard />} />
        <Route path="clients" element={<ClientsList />} />
        <Route path="ib-management" element={<IBList />} />
        <Route path="wallets" element={<WalletsList />} />
        <Route path="deposits" element={<DepositsList />} />
        <Route path="withdrawals" element={<WithdrawalsList />} />
        <Route path="kyc" element={<KYCQueue />} />
        <Route path="rebates" element={<RebatesList />} />
        <Route path="payouts" element={<PayoutsList />} />
        <Route path="risk" element={<RiskMonitor />} />
        <Route path="reports" element={<ReportsList />} />
        <Route path="tickets" element={<TicketsList />} />
        <Route path="mt5-clients" element={<MT5Clients />} />
        <Route path="payment-settings" element={<PaymentSettings />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;