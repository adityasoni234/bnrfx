require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// ============================================
// BROKER ADMIN ROUTES
// ============================================
const brokerMT5Routes = require('./routes/broker/mt5Routes'); // ✅ NEW

app.use('/api/broker/mt5', brokerMT5Routes); // ✅ NEW MT5 ROUTES

// ============================================
// CLIENT PORTAL ROUTES
// ============================================


// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`🔐 Broker Admin API: http://localhost:${PORT}/api/broker`);
  console.log(`👤 Client Portal API: http://localhost:${PORT}/api/client`);
  console.log(`📊 MT5 Integration: http://localhost:${PORT}/api/broker/mt5/health`); // ✅ NEW
});

module.exports = app;