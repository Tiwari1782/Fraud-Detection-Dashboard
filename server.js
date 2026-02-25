require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const sequelize = require('./backend/config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Trust proxy for Render
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
    secure: process.env.NODE_ENV === 'production',
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
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Database setup and server start
const startServer = async () => {
  try {
    console.log('🔄 Attempting database connection...');
    
    // Test connection with retry logic
    let retries = 5;
    while (retries > 0) {
      try {
        await sequelize.authenticate();
        console.log('✅ Database connection established successfully');
        break;
      } catch (error) {
        retries--;
        console.log(`⚠️  Connection attempt failed. Retries left: ${retries}`);
        if (retries === 0) throw error;
        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
      }
    }

    // Sync database
    console.log('🔄 Syncing database...');
    await sequelize.sync({ alter: true });
    console.log('✅ Database synced successfully');

    // Start server
    app.listen(PORT, '0.0.0.0', () => {
      console.log('\n🚀 ========================================');
      console.log('   FRAUD DETECTION DASHBOARD');
      console.log('========================================');
      console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`📍 Port: ${PORT}`);
      console.log(`📍 Database: ${process.env.DATABASE_URL ? 'External MySQL' : 'Local MySQL'}`);
      console.log('🔐 Setup admin: /auth/setup');
      console.log('========================================\n');
    });

  } catch (error) {
    console.error('❌ Failed to start server:');
    console.error('Error:', error.message);
    console.error('\n💡 Troubleshooting:');
    console.error('1. Check DATABASE_URL is set correctly');
    console.error('2. Verify database is accessible');
    console.error('3. Check network/firewall settings');
    console.error('4. Ensure SSL is properly configured\n');
    process.exit(1);
  }
};

startServer();

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('📴 SIGTERM received, closing server...');
  await sequelize.close();
  process.exit(0);
});

process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Promise Rejection:', err);
});