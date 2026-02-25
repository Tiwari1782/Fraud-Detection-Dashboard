require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const sequelize = require('./backend/config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Trust proxy (important for Render)
app.set('trust proxy', 1);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'fraud-detection-secret-key-change-this',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: process.env.NODE_ENV === 'production', // true in production
    httpOnly: true,
    maxAge: 3600000 // 1 hour
  }
}));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'backend/views'));

// Import models
const Admin = require('./backend/models/Admin');
const Transaction = require('./backend/models/Transaction');
const AuditLog = require('./backend/models/AuditLog');
const Settings = require('./backend/models/Settings');

// Define relationships
AuditLog.belongsTo(Admin, { foreignKey: 'admin_id' });
Admin.hasMany(AuditLog, { foreignKey: 'admin_id' });

// Import routes
const authRoutes = require('./backend/routes/authRoutes');
const transactionRoutes = require('./backend/routes/transactionRoutes');
const dashboardRoutes = require('./backend/routes/dashboardRoutes');
const exportRoutes = require('./backend/routes/exportRoutes');
const uploadRoutes = require('./backend/routes/uploadRoutes');
const settingsRoutes = require('./backend/routes/settingsRoutes');
const auditRoutes = require('./backend/routes/auditRoutes');

// Routes
app.use('/auth', authRoutes);
app.use('/transactions', transactionRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/export', exportRoutes);
app.use('/upload', uploadRoutes);
app.use('/settings', settingsRoutes);
app.use('/audit', auditRoutes);

// Home route
app.get('/', (req, res) => {
  if (req.session.adminId) {
    return res.redirect('/dashboard');
  }
  res.redirect('/auth/login');
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Database setup and server start
const startServer = async () => {
  try {
    // Test connection
    await sequelize.authenticate();
    console.log('✅ Database connection established');

    // Sync database
    await sequelize.sync({ alter: true });
    console.log('Database synced');

    // Start server
    app.listen(PORT, '0.0.0.0', () => {
      console.log('\n🚀 Server is running!');
      console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`📍 Port: ${PORT}`);
      console.log(`🔐 Setup admin: /auth/setup\n`);
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    console.error(error);
    process.exit(1);
  }
};

startServer();

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  process.exit(1);
});