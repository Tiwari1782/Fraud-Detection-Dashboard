require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const sequelize = require('./backend/config/database');
const debugRoutes = require('./backend/routes/debugRoutes');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'fraud-detection-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 3600000 }
}));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'backend/views'));

// Import models AFTER app setup
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
app.use('/debug', debugRoutes);
// Home route
app.get('/', (req, res) => {
  if (req.session.adminId) {
    return res.redirect('/dashboard');
  }
  res.redirect('/auth/login');
});

// Database setup and server start
const startServer = async () => {
  try {
    // Test connection
    await sequelize.authenticate();
    console.log('✅ Database connection established');

    // Sync database
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    if (isDevelopment) {
      console.log('⚠️  Development mode: Resetting database...');
      await sequelize.sync({ force: true });
      console.log('✅ Database reset and synced');
      
      // Create default admin
      const adminExists = await Admin.findOne();
      if (!adminExists) {
        await Admin.create({
          username: 'admin',
          password: 'admin123',
          email: 'admin@frauddetection.com'
        });
        console.log('✅ Default admin created: admin / admin123');
      }
    } else {
      await sequelize.sync();
      console.log('✅ Database synced');
    }

    // Start server
    app.listen(PORT, () => {
      console.log('\n🚀 Server is running!');
      console.log(`📍 URL: http://localhost:${PORT}`);
      console.log(`🔐 Login: http://localhost:${PORT}/auth/login`);
      console.log(`📊 Dashboard: http://localhost:${PORT}/dashboard`);
      console.log(`👤 Default credentials: admin / admin123\n`);
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    console.error('\n💡 Troubleshooting:');
    console.error('1. Make sure MySQL is running');
    console.error('2. Check your .env database credentials');
    console.error('3. Try: DROP DATABASE fraud_detection_db; CREATE DATABASE fraud_detection_db;\n');
    process.exit(1);
  }
};

startServer();