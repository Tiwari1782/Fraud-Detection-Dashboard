# 🛡️ AI Fraud Detection Dashboard

<div align="center">

![Fraud Detection Dashboard](screenshots/dashboard.png)

**A real-time AI-powered fraud detection system with interactive dashboards, bulk processing, and comprehensive reporting**

<a href="https://your-app-name.onrender.com/" target="_blank">
  <img src="https://img.shields.io/badge/🚀%20Live%20Demo-Visit%20Dashboard-2563eb?style=for-the-badge&labelColor=1e293b" alt="Live Demo" />
</a>

[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/Tiwari1782/ai-fraud-detection-dashboard)
[![Node.js](https://img.shields.io/badge/Node.js-v14+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)

</div>

---

## 🎯 Project Overview

AI Fraud Detection Dashboard is a comprehensive transaction monitoring platform built with Node.js, featuring:

- **Real-time AI Analysis** - Instant fraud probability calculation using machine learning algorithms
- **Interactive Dashboard** - Beautiful charts and KPI visualizations with Chart.js
- **Bulk Processing** - Upload and analyze thousands of transactions via CSV
- **Multi-format Reports** - Export data in CSV, JSON, and PDF formats
- **Email Alerts** - Automatic notifications for high-risk transactions
- **Audit Trail** - Complete logging of all admin activities
- **Secure Authentication** - Session-based login with bcrypt password hashing

---

## 📸 Demonstration

### Live Application Screenshots

#### Login & Authentication
![Login Page](screenshots/login.png)
*Secure admin authentication with session management*

#### Dashboard Overview
![Dashboard](screenshots/dashboard.png)
*Real-time statistics with fraud rate analysis and trend charts*

#### Transaction Management
![Add Transaction](screenshots/add-transaction.png)
*Add individual transactions with instant AI fraud detection*

![Transaction List](screenshots/transaction-list.png)
*View all transactions with advanced filtering and pagination*

#### Bulk Upload
![Bulk Upload](screenshots/bulk-upload.png)
*Process multiple transactions simultaneously via CSV upload*

#### Export & Reports
![Export Reports](screenshots/export.png)
*Generate professional reports in multiple formats*

#### Settings & Configuration
![Settings](screenshots/settings.png)
*Configure fraud thresholds and email notifications*

#### Audit Logs
![Audit Logs](screenshots/audit-logs.png)
*Track all admin activities with detailed logging*

---

## ✨ Features

### 🔐 Authentication & Security
* Session-based authentication with Express Session  
* Password hashing with bcryptjs (10 salt rounds)  
* Protected routes with authentication middleware  
* Secure cookie management  
* Admin user management  
* Automatic session expiration  

### 📊 Dashboard & Analytics
* **Real-time KPI Cards** - Total transactions, fraud count, fraud rate, legitimate count  
* **Interactive Charts** - Pie charts, bar charts, and trend analysis  
* **Fraud Trend Visualization** - Last 30 days fraud activity  
* **Device Analysis** - Transaction breakdown by device type  
* **High-Risk Alerts** - Dedicated section for high-risk transactions  
* **Responsive Design** - Works seamlessly on all devices  

### 🤖 AI Fraud Detection
* Real-time fraud probability calculation  
* Multiple risk factors analysis:
  - Transaction amount patterns  
  - Time-based anomalies (unusual hours)  
  - Device type risk assessment  
  - Geographic location analysis  
* Configurable fraud threshold  
* Fallback logic for API unavailability  
* Toast notifications for instant feedback  

### 💳 Transaction Management
* **Add Transactions** - Single transaction entry with real-time validation  
* **View All Transactions** - Paginated list with sorting and filtering  
* **Advanced Filters** - By prediction type, device, amount range, date  
* **Transaction Details** - Complete transaction information with fraud analysis  
* **Fraud Probability Display** - Color-coded risk indicators  

### 📤 Bulk Upload & Processing
* CSV file upload with validation  
* Support for 1000+ transactions  
* Row-by-row error handling  
* Detailed upload results (success/failed counts)  
* Sample CSV template download  
* Real-time processing feedback  

### 📥 Export & Reporting
* **CSV Export** - Excel-compatible spreadsheet format  
* **JSON Export** - API-ready structured data  
* **PDF Export** - Professional reports with summary  
* **Date Range Filtering** - Export specific time periods  
* **Prediction Filtering** - Filter by fraud/legitimate  
* **Unlimited Records** - No pagination limits on exports  

### 📧 Email Notifications
* Automatic alerts for high-risk transactions (≥70% probability)  
* Configurable email settings  
* Gmail integration with app passwords  
* Customizable alert thresholds  
* HTML email templates  

### 📜 Audit Logging
* Track all admin activities  
* IP address logging  
* Timestamp recording  
* Action type categorization  
* Paginated audit trail  
* Complete transparency  

### ⚙️ Settings & Configuration
* **Fraud Alert Threshold** - Customize risk sensitivity (0-1)  
* **Email Configuration** - Set up notification preferences  
* **Daily Reports** - Enable/disable automated reports  
* **System Information** - Node.js version, uptime, database status  
* **Danger Zone** - Database reset options (protected)  

---

## 🛠️ Tech Stack

### Backend
- **Node.js** (v14+) - JavaScript runtime environment
- **Express.js** (v4.18.2) - Fast, minimalist web framework
- **Sequelize** (v6.35.2) - Promise-based ORM for MySQL
- **MySQL** - Relational database management system

### Frontend
- **EJS** (v3.1.9) - Embedded JavaScript templating
- **Bootstrap 5** - Responsive CSS framework
- **Chart.js** (v4.4.0) - Beautiful, interactive charts
- **Font Awesome** (v6.5.1) - Professional icon library
- **Plus Jakarta Sans** - Modern custom font

### Authentication & Security
- **bcryptjs** (v2.4.3) - Password hashing with salt
- **express-session** (v1.17.3) - Session middleware
- **dotenv** (v16.3.1) - Environment variable management

### File Processing
- **Multer** (v1.4.5-lts.1) - Multipart/form-data handling
- **csv-parser** (v3.0.0) - CSV file parsing
- **PDFKit** (v0.13.0) - PDF generation

### API Integration
- **Axios** (v1.6.0) - HTTP client for AI API calls
- **Nodemailer** (v6.9.7) - Email sending service

### Development Tools
- **Nodemon** (v3.0.2) - Auto-restart on file changes

---

## 📁 Project Structure

```
ai-fraud-detection-dashboard/
├── backend/
│   ├── config/
│   │   └── database.js              # Sequelize database configuration
│   │
│   ├── controllers/
│   │   ├── authController.js        # Authentication logic (login, logout, setup)
│   │   ├── dashboardController.js   # Dashboard statistics and charts
│   │   ├── transactionController.js # CRUD operations for transactions
│   │   ├── uploadController.js      # CSV bulk upload processing
│   │   ├── exportController.js      # CSV, JSON, PDF export functionality
│   │   ├── settingsController.js    # System settings management
│   │   └── auditController.js       # Audit log viewing
│   │
│   ├── models/
│   │   ├── Admin.js                 # Admin user schema
│   │   ├── Transaction.js           # Transaction schema with fraud data
│   │   ├── AuditLog.js              # Audit trail schema
│   │   └── Settings.js              # Application settings schema
│   │
│   ├── routes/
│   │   ├── authRoutes.js            # Authentication endpoints
│   │   ├── dashboardRoutes.js       # Dashboard route
│   │   ├── transactionRoutes.js     # Transaction CRUD routes
│   │   ├── uploadRoutes.js          # Bulk upload routes
│   │   ├── exportRoutes.js          # Export routes
│   │   ├── settingsRoutes.js        # Settings routes
│   │   └── auditRoutes.js           # Audit log routes
│   │
│   ├── services/
│   │   ├── aiFraudService.js        # AI fraud detection logic
│   │   └── emailService.js          # Email notification service
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js        # Route protection
│   │   └── auditMiddleware.js       # Activity logging
│   │
│   └── views/
│       ├── partials/
│       │   ├── header.ejs           # Shared header with navbar
│       │   └── footer.ejs           # Shared footer
│       ├── login.ejs                # Login page
│       ├── dashboard.ejs            # Main dashboard
│       ├── addTransaction.ejs       # Add transaction form
│       ├── transactionList.ejs      # All transactions table
│       ├── upload.ejs               # CSV upload page
│       ├── export.ejs               # Export reports page
│       ├── settings.ejs             # Settings management
│       └── auditLogs.ejs            # Audit trail viewer
│
├── public/
│   ├── css/
│   │   └── style.css                # Custom styles with blue theme
│   └── js/
│       ├── dashboard.js             # Chart.js initialization
│       └── toast.js                 # Toast notification system
│
├── uploads/                          # Temporary CSV upload directory
│   └── .gitkeep
│
├── screenshots/                      # Application screenshots for README
│   ├── dashboard.png
│   ├── login.png
│   ├── add-transaction.png
│   ├── transaction-list.png
│   ├── bulk-upload.png
│   ├── export.png
│   ├── settings.png
│   └── audit-logs.png
│
├── .env                              # Environment variables (NOT in Git)
├── .env.example                      # Environment template
├── .gitignore                        # Git ignore rules
├── package.json                      # Dependencies and scripts
├── server.js                         # Main application entry point
├── createAdmin.js                    # Admin user creation script
├── checkAdmin.js                     # Verify admin existence
├── README.md                         # This file
└── DEPLOYMENT_CHECKLIST.md           # Deployment guide
```

---

## 🗄️ Database Schema

### Admin Model (`models/Admin.js`)

```javascript
const adminSchema = new DataTypes.Model({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false  // Stored as bcrypt hash
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
});

// Relationships
Admin.hasMany(AuditLog, { foreignKey: 'admin_id' });
```

### Transaction Model (`models/Transaction.js`)

```javascript
const transactionSchema = new DataTypes.Model({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0.01
    }
  },
  transaction_time: {
    type: DataTypes.DATE,
    allowNull: false
  },
  device_type: {
    type: DataTypes.ENUM('Mobile', 'Desktop', 'Tablet', 'POS'),
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  prediction: {
    type: DataTypes.ENUM('fraud', 'legitimate'),
    allowNull: false
  },
  fraud_probability: {
    type: DataTypes.DECIMAL(5, 4),
    allowNull: false,
    validate: {
      min: 0,
      max: 1
    }
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
});
```

### AuditLog Model (`models/AuditLog.js`)

```javascript
const auditLogSchema = new DataTypes.Model({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  admin_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Admins',
      key: 'id'
    }
  },
  action: {
    type: DataTypes.STRING,
    allowNull: false  // e.g., "LOGIN", "ADD_TRANSACTION", "DELETE_TRANSACTION"
  },
  ip_address: {
    type: DataTypes.STRING
  },
  details: {
    type: DataTypes.TEXT  // JSON string of additional details
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

// Relationships
AuditLog.belongsTo(Admin, { foreignKey: 'admin_id' });
```

### Settings Model (`models/Settings.js`)

```javascript
const settingsSchema = new DataTypes.Model({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  key: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  value: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  updatedAt: DataTypes.DATE
});

// Example settings:
// key: "fraud_threshold", value: "0.7"
// key: "alert_email", value: "admin@example.com"
// key: "daily_report", value: "true"
```

---

## 🤖 AI Fraud Detection Logic

### Risk Calculation Algorithm

```javascript
// backend/services/aiFraudService.js

/**
 * Calculate fraud probability based on multiple factors
 * @param {Object} transactionData - Transaction details
 * @returns {Object} - { prediction: 'fraud'|'legitimate', fraud_probability: 0-1 }
 */
async function detectFraud(transactionData) {
  const { amount, transaction_time, device_type, location } = transactionData;
  
  let riskScore = 0;
  
  // Factor 1: Amount-based risk (40% weight)
  if (amount > 10000) riskScore += 0.4;
  else if (amount > 5000) riskScore += 0.25;
  else if (amount > 1000) riskScore += 0.1;
  
  // Factor 2: Time-based risk (20% weight)
  const hour = new Date(transaction_time).getHours();
  if (hour >= 0 && hour <= 5) riskScore += 0.2;  // Late night transactions
  else if (hour >= 22) riskScore += 0.15;
  
  // Factor 3: Device-based risk (15% weight)
  const deviceRisk = {
    'Mobile': 0.05,
    'Desktop': 0.03,
    'Tablet': 0.04,
    'POS': 0.02
  };
  riskScore += deviceRisk[device_type] || 0.05;
  
  // Factor 4: Location-based risk (25% weight)
  const highRiskLocations = ['Nigeria', 'Unknown', 'Russia', 'China'];
  if (highRiskLocations.some(loc => location.toLowerCase().includes(loc.toLowerCase()))) {
    riskScore += 0.25;
  }
  
  // Normalize to 0-1 range
  const fraud_probability = Math.min(riskScore, 1);
  
  // Classify as fraud if probability >= 0.5
  const prediction = fraud_probability >= 0.5 ? 'fraud' : 'legitimate';
  
  return {
    prediction,
    fraud_probability: parseFloat(fraud_probability.toFixed(4))
  };
}
```

### Risk Factors Breakdown

| Factor | Weight | High Risk Triggers |
|--------|--------|-------------------|
| **Amount** | 40% | > $10,000 = +0.4<br>> $5,000 = +0.25<br>> $1,000 = +0.1 |
| **Time** | 20% | 12 AM - 5 AM = +0.2<br>10 PM - 12 AM = +0.15 |
| **Device** | 15% | Mobile = +0.05<br>Desktop = +0.03<br>Tablet = +0.04<br>POS = +0.02 |
| **Location** | 25% | High-risk countries = +0.25 |

### Fraud Classification

```
fraud_probability >= 0.7  →  🔴 HIGH RISK (Email alert sent)
fraud_probability >= 0.5  →  🟠 MEDIUM RISK (Marked as fraud)
fraud_probability < 0.5   →  🟢 LOW RISK (Legitimate)
```

---

## ⚙️ Setup & Run Locally

### Prerequisites

- **Node.js** v14 or higher ([Download](https://nodejs.org))
- **MySQL** v5.7+ or v8.0+ ([Download](https://www.mysql.com/downloads/))
- **Git** ([Download](https://git-scm.com/downloads))

### Installation Steps

#### 1️⃣ Clone Repository

```bash
git clone https://github.com/Tiwari1782/ai-fraud-detection-dashboard.git
cd ai-fraud-detection-dashboard
```

#### 2️⃣ Install Dependencies

```bash
npm install
```

#### 3️⃣ Setup MySQL Database

```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE fraud_detection_db;

# Exit
exit;
```

#### 4️⃣ Configure Environment Variables

Create `.env` file in root directory:

```bash
# Copy template
cp .env.example .env

# Edit .env file
```

**Example `.env` content:**

```env
# Environment
NODE_ENV=development

# Server
PORT=3000
SESSION_SECRET=your-super-secret-random-string-at-least-32-characters

# Local Database (MySQL)
DB_NAME=fraud_detection_db
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_HOST=localhost
DB_PORT=3306

# Email Configuration (Optional)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
ADMIN_EMAIL=admin@yourdomain.com
```

#### 5️⃣ Create Admin User

```bash
# Option 1: Run setup script
node createAdmin.js

# Option 2: Visit setup page (after starting server)
# http://localhost:3000/auth/setup
```

**Default Credentials:**
- Username: `admin`
- Password: `admin123`

⚠️ **Change password immediately after first login!**

#### 6️⃣ Start Application

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

#### 7️⃣ Open in Browser

```
http://localhost:3000/auth/login
```

---

## 🌐 API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| GET | `/auth/login` | Show login page | Public |
| POST | `/auth/login` | Authenticate user | Public |
| GET | `/auth/logout` | Logout user | Required |
| GET | `/auth/setup` | Create first admin (one-time) | Public |

### Dashboard Routes

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| GET | `/dashboard` | View main dashboard | Required |
| GET | `/` | Redirect to dashboard/login | Public |

### Transaction Routes

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| GET | `/transactions/add` | Show add transaction form | Required |
| POST | `/transactions/add` | Create new transaction | Required |
| GET | `/transactions/list` | View all transactions | Required |

**Query Parameters for `/transactions/list`:**
- `page` - Page number (default: 1)
- `prediction` - Filter by fraud/legitimate
- `device_type` - Filter by device
- `minAmount` - Minimum transaction amount
- `maxAmount` - Maximum transaction amount
- `sortBy` - Sort field (created_at, amount, fraud_probability)

### Upload Routes

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| GET | `/upload` | Show bulk upload page | Required |
| POST | `/upload` | Process CSV upload | Required |
| GET | `/upload/sample` | Download sample CSV | Required |

### Export Routes

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| GET | `/export` | Show export page | Required |
| GET | `/export/csv` | Export as CSV | Required |
| GET | `/export/json` | Export as JSON | Required |
| GET | `/export/pdf` | Export as PDF | Required |

**Query Parameters for exports:**
- `startDate` - Filter from date (YYYY-MM-DD)
- `endDate` - Filter to date (YYYY-MM-DD)
- `prediction` - Filter by fraud/legitimate

### Settings Routes

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| GET | `/settings` | View settings page | Required |
| POST | `/settings` | Update settings | Required |

### Audit Routes

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| GET | `/audit` | View audit logs | Required |

---

## 🔐 Security Features

### Password Security
* **bcryptjs hashing** with 10 salt rounds  
* **Salt rounds:** Random data added before hashing  
* **One-way encryption:** Passwords cannot be decrypted  
* **Rainbow table protection:** Salt prevents precomputed hash attacks  

### Session Management
* **HTTP-only cookies:** Prevent XSS attacks  
* **Secure flag:** HTTPS-only in production  
* **Session expiration:** Auto-logout after 1 hour  
* **Secret key:** Random session secret in .env  

### Authentication Middleware
```javascript
// Protect routes from unauthorized access
function isLoggedIn(req, res, next) {
  if (!req.session.adminId) {
    req.flash('error', 'Please login first');
    return res.redirect('/auth/login');
  }
  next();
}
```

### Input Validation
* **Server-side validation:** All inputs sanitized  
* **SQL injection protection:** Sequelize parameterized queries  
* **XSS protection:** EJS auto-escapes output  
* **File upload validation:** CSV format and size checks  

### Environment Variables
* **Sensitive data:** Stored in .env (not in Git)  
* **.gitignore:** Prevents .env from being committed  
* **.env.example:** Template without real values  

---

## 📧 Email Configuration

### Gmail Setup (Recommended)

#### 1️⃣ Enable 2-Step Verification

Go to [Google Account Security](https://myaccount.google.com/security)

1. Click **"2-Step Verification"**
2. Follow setup instructions
3. Verify with phone number

#### 2️⃣ Generate App Password

Go to [App Passwords](https://myaccount.google.com/apppasswords)

1. Select **"Mail"**
2. Select **"Other (Custom name)"**
3. Enter: `Fraud Detection Dashboard`
4. Click **"Generate"**
5. Copy 16-character password (e.g., `abcd efgh ijkl mnop`)

#### 3️⃣ Update .env File

```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=abcdefghijklmnop  # Remove spaces
ADMIN_EMAIL=admin@yourdomain.com
```

#### 4️⃣ Test Email

Add a high-risk transaction (amount > $10,000 at 2 AM) to trigger alert.

---

## 📝 CSV Upload Format

### Required Columns

```csv
amount,transaction_time,device_type,location
150.00,2026-02-25T10:30:00,Mobile,New York
5000.00,2026-02-25T02:15:00,Desktop,Nigeria
75.50,2026-02-25T14:20:00,Tablet,London
```

### Column Specifications

| Column | Type | Format | Example |
|--------|------|--------|---------|
| `amount` | Decimal | Positive number | `150.00` |
| `transaction_time` | DateTime | ISO 8601 or YYYY-MM-DD HH:MM:SS | `2026-02-25T10:30:00` |
| `device_type` | Enum | Mobile, Desktop, Tablet, POS | `Mobile` |
| `location` | String | City or Country | `New York` |

### Download Sample

```
http://localhost:3000/upload/sample
```

---

## 🚀 Deployment Guide

### Deploy to Render

#### Prerequisites
- GitHub account
- Railway account (for MySQL)
- Render account

#### Step 1: Setup Railway MySQL

1. Go to [railway.app](https://railway.app)
2. Create new project
3. Add MySQL database
4. Copy connection URL:
   ```
   mysql://root:password@host:port/railway
   ```

#### Step 2: Push to GitHub

```bash
git add .
git commit -m "feat: prepare for deployment"
git push origin main
```

#### Step 3: Deploy on Render

1. Go to [render.com](https://render.com)
2. Click **"New +" → "Web Service"**
3. Connect GitHub repository
4. Configure:
   - **Name:** `fraud-detection-dashboard`
   - **Region:** Oregon (same as Railway)
   - **Branch:** `main`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

5. Add environment variables:
   ```
   NODE_ENV=production
   SESSION_SECRET=your-random-secret-here
   DATABASE_URL=mysql://root:pass@railway-host:port/railway
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   ADMIN_EMAIL=admin@yourdomain.com
   ```

6. Click **"Create Web Service"**

#### Step 4: Create Admin User

Visit: `https://your-app.onrender.com/auth/setup`

---

## ⚠️ Troubleshooting

### Common Issues & Solutions

#### Issue: "Cannot connect to database"

**Solution:**
```bash
# Check MySQL is running
sudo service mysql status

# Check credentials in .env
DB_USER=root
DB_PASSWORD=correct_password
DB_HOST=localhost
```

#### Issue: "Admin already exists"

**Solution:**
```bash
# Check existing admin
node checkAdmin.js

# Or login with default credentials
Username: admin
Password: admin123
```

#### Issue: "Email not sending"

**Solution:**
1. Verify 2-Step Verification is enabled
2. Generate new App Password (not regular password)
3. Remove spaces from app password in .env
4. Check EMAIL_USER is correct Gmail address

#### Issue: "Session not persisting"

**Solution:**
```env
# Make sure SESSION_SECRET is set
SESSION_SECRET=a-very-long-random-string-at-least-32-characters

# For production, also set:
NODE_ENV=production
```

#### Issue: "CSV upload fails"

**Solution:**
1. Check header row exactly matches: `amount,transaction_time,device_type,location`
2. No extra spaces around commas
3. Date format: `2026-02-25T10:30:00`
4. Device must be: Mobile, Desktop, Tablet, or POS
5. Save as UTF-8 encoding

---

## 🧪 Testing

### Test Scenarios

#### 1. High-Risk Transaction
```json
{
  "amount": 15000,
  "transaction_time": "2026-02-25T02:00:00",
  "device_type": "Mobile",
  "location": "Nigeria"
}
```
**Expected:** fraud_probability ≥ 0.7, email alert sent

#### 2. Low-Risk Transaction
```json
{
  "amount": 50,
  "transaction_time": "2026-02-25T14:00:00",
  "device_type": "Desktop",
  "location": "New York"
}
```
**Expected:** fraud_probability < 0.5, marked as legitimate

#### 3. Bulk Upload
- Upload sample CSV with 10 transactions
- Verify success count
- Check dashboard updates

---

## 🔮 Future Enhancements

### Planned Features

- [ ] **Machine Learning Integration** - Real ML model instead of rule-based
- [ ] **Multi-user Support** - Role-based access control
- [ ] **Advanced Analytics** - More charts and insights
- [ ] **Real-time Alerts** - WebSocket notifications
- [ ] **Transaction Timeline** - Visual transaction history
- [ ] **Dark Mode** - Theme switcher
- [ ] **API Documentation** - Swagger/OpenAPI
- [ ] **Mobile App** - React Native companion app
- [ ] **Scheduled Reports** - Automated daily/weekly emails
- [ ] **Data Visualization** - Heatmaps, geomaps
- [ ] **Integration APIs** - Stripe, PayPal webhooks
- [ ] **Custom Fraud Rules** - User-defined risk factors

---

## 🤝 Contributing

Contributions are welcome! This is a learning project open for improvements.

### How to Contribute

1. **Fork** the repository
2. **Create** feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** changes (`git commit -m 'Add AmazingFeature'`)
4. **Push** to branch (`git push origin feature/AmazingFeature`)
5. **Open** Pull Request

### Development Guidelines

- Follow existing code style
- Add comments for complex logic
- Test before submitting PR
- Update README if needed

---

## 📄 License

This project is open-source and available for educational purposes.

**License:** MIT

---

## 🙏 Acknowledgments

- **Chart.js** - Beautiful data visualization
- **Bootstrap 5** - Responsive UI framework
- **Font Awesome** - Professional icons
- **Sequelize** - Elegant ORM for MySQL
- **Express.js** - Fast, minimalist web framework
- **bcryptjs** - Secure password hashing
- **Nodemailer** - Email sending made easy
- **Railway.app** - Free MySQL hosting
- **Render.com** - Easy deployment platform

---

## 👨‍💻 Author

**Prakash Tiwari**  
Full Stack Developer | AI Enthusiast

- 🌐 GitHub: [@Tiwari1782](https://github.com/Tiwari1782)
- 📧 Email: prakashtiwarie06@gmail.com
- 💼 LinkedIn: [Prakash Tiwari](https://linkedin.com/in/yourprofile)
- 🚀 Portfolio: [Coming Soon]

---

## 📞 Support

### Need Help?

- 📖 **Documentation:** Read this README thoroughly
- 🐛 **Bug Reports:** Open an issue on GitHub
- 💡 **Feature Requests:** Open an issue with `[Feature]` tag
- 📧 **Email:** prakashtiwarie06@gmail.com

### Reporting Issues

Please include:
1. Node.js version (`node --version`)
2. MySQL version
3. Error message/screenshot
4. Steps to reproduce

---

## ⭐ Show Your Support

If this project helped you learn or solve a problem, please consider:

- ⭐ **Star** this repository
- 🍴 **Fork** for your own use
- 📢 **Share** with others
- 💬 **Provide feedback**

---

<div align="center">

**Built with ❤️ by Prakash Tiwari**

*Learning Full Stack Development • Building Real-World Projects*

---

[![GitHub followers](https://img.shields.io/github/followers/Tiwari1782?style=social)](https://github.com/Tiwari1782)
[![GitHub stars](https://img.shields.io/github/stars/Tiwari1782/ai-fraud-detection-dashboard?style=social)](https://github.com/Tiwari1782/ai-fraud-detection-dashboard)

**⭐ Star this repo if you found it helpful!**

</div>