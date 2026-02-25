const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    // Only initialize if email credentials are provided
    if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
      this.transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE || 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
      });
      this.enabled = true;
    } else {
      this.enabled = false;
      console.log('⚠️  Email service disabled (no credentials in .env)');
    }
  }

  async sendHighRiskAlert(transaction) {
    if (!this.enabled) {
      console.log(`⚠️  High-risk alert (email disabled): Transaction #${transaction.id} - ${(transaction.fraud_probability * 100).toFixed(1)}%`);
      return;
    }

    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
        subject: `⚠️ HIGH RISK FRAUD ALERT - Transaction #${transaction.id}`,
        html: `
          <h2 style="color: red;">High-Risk Transaction Detected!</h2>
          <table style="border-collapse: collapse; width: 100%;">
            <tr style="background-color: #f2f2f2;">
              <td style="padding: 10px; border: 1px solid #ddd;"><strong>Transaction ID:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">#${transaction.id}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd;"><strong>Amount:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">$${transaction.amount}</td>
            </tr>
            <tr style="background-color: #f2f2f2;">
              <td style="padding: 10px; border: 1px solid #ddd;"><strong>Fraud Probability:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;"><strong style="color: red;">${(transaction.fraud_probability * 100).toFixed(1)}%</strong></td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd;"><strong>Device:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${transaction.device_type}</td>
            </tr>
            <tr style="background-color: #f2f2f2;">
              <td style="padding: 10px; border: 1px solid #ddd;"><strong>Location:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${transaction.location}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd;"><strong>Time:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${new Date(transaction.transaction_time).toLocaleString()}</td>
            </tr>
          </table>
          <p style="margin-top: 20px;">
            <a href="http://localhost:3000/dashboard" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View Dashboard</a>
          </p>
        `
      };

      await this.transporter.sendMail(mailOptions);
      console.log(`✅ Email alert sent for transaction #${transaction.id}`);
      
    } catch (error) {
      console.error('❌ Email service error:', error.message);
    }
  }

  async sendDailyReport(stats) {
    if (!this.enabled) {
      return;
    }

    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
        subject: `📊 Daily Fraud Detection Report - ${new Date().toDateString()}`,
        html: `
          <h2>Daily Fraud Detection Summary</h2>
          <ul>
            <li><strong>Total Transactions:</strong> ${stats.total}</li>
            <li><strong>Fraud Detected:</strong> ${stats.fraud}</li>
            <li><strong>Fraud Rate:</strong> ${stats.fraudRate}%</li>
            <li><strong>Highest Risk Transaction:</strong> $${stats.highestAmount}</li>
          </ul>
          <p><a href="http://localhost:3000/dashboard">View Full Dashboard</a></p>
        `
      };

      await this.transporter.sendMail(mailOptions);
      console.log('Daily report sent');
      
    } catch (error) {
      console.error('❌ Daily report error:', error.message);
    }
  }
}

module.exports = new EmailService();