# 🛡️ AI Fraud Detection Dashboard

A modern, real-time fraud detection system powered by AI with an intuitive web dashboard.

![Node.js](https://img.shields.io/badge/Node.js-14%2B-green)
![License](https://img.shields.io/badge/license-MIT-blue)
![Status](https://img.shields.io/badge/status-active-success)

## ✨ Features

- 🤖 **AI-Powered Detection** - Real-time fraud analysis
- 📊 **Interactive Dashboard** - Beautiful charts and KPIs
- 📤 **Bulk Upload** - Process multiple transactions via CSV
- 📥 **Export Reports** - CSV, JSON, and PDF formats
- 📧 **Email Alerts** - Automatic high-risk notifications
- 📜 **Audit Logs** - Track all admin activities
- 🔐 **Secure Authentication** - Session-based login system
- 📱 **Responsive Design** - Works on all devices

## 🚀 Quick Start

### Prerequisites

- Node.js 14+ and npm
- MySQL 5.7+ or 8.0+
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ai-fraud-detection-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Create database**
   ```bash
   mysql -u root -p
   CREATE DATABASE fraud_detection_db;
   exit;
   ```

5. **Start the application**
   ```bash
   npm run dev
   ```

6. **Create admin user**
   ```bash
   # Visit: http://localhost:3000/auth/setup
   # Or run: npm run create-admin
   ```

7. **Login**
   ```
   URL: http://localhost:3000/auth/login
   Username: admin
   Password: admin123
   ```

## 📁 Project Structure

```
ai-fraud-detection-dashboard/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── dashboardController.js
│   │   ├── transactionController.js
│   │   ├── exportController.js
│   │   ├── uploadController.js
│   │   ├── settingsController.js
│   │   └── auditController.js
│   ├── models/
│   │   ├── Admin.js
│   │   ├── Transaction.js
│   │   ├── AuditLog.js
│   │   └── Settings.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── dashboardRoutes.js
│   │   ├── transactionRoutes.js
│   │   ├── exportRoutes.js
│   │   ├── uploadRoutes.js
│   │   ├── settingsRoutes.js
│   │   └── auditRoutes.js
│   ├── services/
│   │   ├── aiFraudService.js
│   │   └── emailService.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── auditMiddleware.js
│   └── views/
│       ├── login.ejs
│       ├── dashboard.ejs
│       ├── addTransaction.ejs
│       ├── transactionList.ejs
│       ├── upload.ejs
│       ├── export.ejs
│       ├── settings.ejs
│       ├── auditLogs.ejs
│       └── partials/
│           ├── header.ejs
│           └── footer.ejs
├── public/
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── dashboard.js
│       └── toast.js
├── uploads/
│   └── .gitkeep
├── .env.example
├── .gitignore
├── package.json
├── server.js
└── README.md
```

## 🔧 Configuration

### Environment Variables

See `.env.example` for all available options.

### Database Setup

The application uses Sequelize ORM with MySQL. Tables are created automatically on first run.

### Email Configuration (Optional)

To enable email alerts for high-risk transactions:

1. Use Gmail with App Password
2. Set `EMAIL_USER` and `EMAIL_PASSWORD` in `.env`
3. Configure `ADMIN_EMAIL` for notifications

## 📖 Usage

### Adding Transactions

1. Navigate to **Add Transaction**
2. Fill in: Amount, Date/Time, Device, Location
3. AI analyzes and provides fraud probability
4. Toast notification shows result

### Bulk Upload

1. Navigate to **Bulk Upload**
2. Download sample CSV template
3. Fill with your data
4. Upload file (supports 1000+ rows)

### Exporting Reports

1. Navigate to **Export Reports**
2. Select date range and filters
3. Choose format: CSV, JSON, or PDF
4. Download instantly

### Settings

- Configure fraud alert threshold
- Set email notifications
- Enable/disable daily reports
- View system information

## 🚢 Deployment

### Deploy to Heroku

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create your-app-name

# Add MySQL addon
heroku addons:create jawsdb:kitefin

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set SESSION_SECRET=$(openssl rand -base64 32)

# Deploy
git push heroku main

# Create admin
heroku run npm run create-admin
```

### Deploy to Railway

1. Push to GitHub
2. Connect Railway to your repository
3. Add MySQL database
4. Set environment variables
5. Deploy automatically

### Deploy to Render

1. Push to GitHub
2. Create new Web Service on Render
3. Add PostgreSQL or MySQL database
4. Set environment variables
5. Deploy

## 🔒 Security

- Passwords hashed with bcryptjs
- Session-based authentication
- SQL injection protection via Sequelize
- XSS protection with EJS escaping
- CSRF protection recommended for production


## 👤 Author

**Your Name**
- GitHub: [@Tiwari1782](https://github.com/Tiwari1782)
- Email: prakashtiwarie06@gmail.com

## 🙏 Acknowledgments

- Font Awesome for icons
- Bootstrap for UI framework
- Chart.js for visualizations
- Sequelize for ORM


---

Made with ❤️ by Prakash Tiwari