import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Website Pages
import Home from './pages/Website/Home';
import Contact from './pages/Website/Contact';

// Company Pages
import WhyBNRFx from './pages/Website/Company/WhyBNRFx';
import ContactUs from './pages/Website/Company/Contactus';
import Awards from './pages/Website/Company/Awards';
import Regulation from './pages/Website/Company/Regulation';
import Career from './pages/Website/Company/Career';

// Important Links Pages
import TradingRewards from './pages/Website/ImportantLinks/Tradingrewards';
import ExclusiveRewards from './pages/Website/ImportantLinks/Exclusiverewards';
import Partnership from './pages/Website/ImportantLinks/Partnership';
import DepositBonus from './pages/Website/ImportantLinks/Depositbonus';

// Extra's Pages
import SocialMedia from './pages/Website/Extras/Socialmedia';
import MarginCalculator from './pages/Website/Extras/Margincalculator';

// Accounts Pages
import DemoAccount from './pages/Website/Accounts/Demoaccount';
import ENCAccount from './pages/Website/Accounts/Encaccount';
import StandardAccount from './pages/Website/Accounts/StandardAccount';
import PremiumAccount from './pages/Website/Accounts/PremiumAccount';

// Forex Pages
import Trading from './pages/Website/Forex/Trading';
import IslamicAccount from './pages/Website/Forex/Islamicaccount';
import TradingConditions from './pages/Website/Forex/Tradingconditions';
import AccountComparison from './pages/Website/Forex/Accountcomparison';

// Financial Pages
import SecurityOfFunds from './pages/Website/Financial/Securityoffunds';
import DepositWithdrawal from './pages/Website/Financial/Depositwithdrawal';
import NegativeBalanceProtection from './pages/Website/Financial/Negativebalanceprotection';

// Platform Pages
import AllTerminal from './pages/Website/Platform/Allterminal';
import DownloadPC from './pages/Website/Platform/Downloadpc';
import DownloadAndroid from './pages/Website/Platform/Downloadandroid';
import DownloadApple from './pages/Website/Platform/Downloadapple';

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

// ==================== SCROLL TO TOP COMPONENT ====================
// Automatically scrolls to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // 'instant' for immediate scroll, 'smooth' for animated
    });
  }, [pathname]);

  return null;
}

// Broker Protected Route Component
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
    <>
      {/* ScrollToTop component - ensures all pages open from top */}
      <ScrollToTop />
      
      <Routes>
        {/* ==================== WEBSITE ROUTES ==================== */}
        
        {/* Home Page */}
        <Route path="/" element={<Home />} />
        
        {/* Contact Page */}
        <Route path="/contact" element={<Contact />} />

        {/* Company Routes */}
        <Route path="/company/why-bnr-fx" element={<WhyBNRFx />} />
        <Route path="/company/contact-us" element={<ContactUs />} />
        <Route path="/company/awards" element={<Awards />} />
        <Route path="/company/regulation" element={<Regulation />} />
        <Route path="/company/career" element={<Career />} />

        {/* Important Links Routes */}
        <Route path="/important-links/trading-rewards" element={<TradingRewards />} />
        <Route path="/important-links/exclusive-rewards" element={<ExclusiveRewards />} />
        <Route path="/important-links/partnership" element={<Partnership />} />
        <Route path="/important-links/deposit-bonus" element={<DepositBonus />} />

        {/* Extra's Routes */}
        <Route path="/extras/social-media" element={<SocialMedia />} />
        <Route path="/extras/margin-calculator" element={<MarginCalculator />} />

        {/* Accounts Routes */}
        <Route path="/accounts/demo-account" element={<DemoAccount />} />
        <Route path="/accounts/enc-account" element={<ENCAccount />} />
        <Route path="/accounts/standard-account" element={<StandardAccount />} />
        <Route path="/accounts/premium-account" element={<PremiumAccount />} />

        {/* Forex Routes */}
        <Route path="/forex/trading" element={<Trading />} />
        <Route path="/forex/islamic-account" element={<IslamicAccount />} />
        <Route path="/forex/trading-conditions" element={<TradingConditions />} />
        <Route path="/forex/account-comparison" element={<AccountComparison />} />

        {/* Financial Routes */}
        <Route path="/financial/security-of-funds" element={<SecurityOfFunds />} />
        <Route path="/financial/deposit-withdrawal" element={<DepositWithdrawal />} />
        <Route path="/financial/negative-balance-protection" element={<NegativeBalanceProtection />} />

        {/* Platform Routes */}
        <Route path="/platform/all-terminal" element={<AllTerminal />} />
        <Route path="/platform/download-pc" element={<DownloadPC />} />
        <Route path="/platform/download-android" element={<DownloadAndroid />} />
        <Route path="/platform/download-apple" element={<DownloadApple />} />

        {/* ==================== AUTHENTICATION ROUTES ==================== */}
        
        {/* Broker Admin Login - Public Route */}
        <Route path="/broker-admin/login" element={<BrokerLogin />} />

        {/* Client Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/login" element={<Login />} />

        {/* ==================== ADMIN ROUTES ==================== */}
        
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

        {/* ==================== BROKER ADMIN ROUTES ==================== */}
        
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
    </>
  );
}

export default App;