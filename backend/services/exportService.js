const PDFDocument = require('pdfkit');
const { Parser } = require('json2csv');
const Transaction = require('../models/Transaction');
const { Op } = require('sequelize');

class ExportService {
  // Export transactions to CSV
  async exportToCSV(filters = {}) {
    try {
      const transactions = await this.getFilteredTransactions(filters);
      
      const fields = [
        'id',
        'amount',
        'transaction_time',
        'device_type',
        'location',
        'prediction',
        'fraud_probability',
        'created_at'
      ];

      const json2csvParser = new Parser({ fields });
      const csv = json2csvParser.parse(transactions);
      
      return csv;
    } catch (error) {
      throw new Error('CSV export failed: ' + error.message);
    }
  }

  // Export transactions to PDF
  async exportToPDF(filters = {}) {
    try {
      const transactions = await this.getFilteredTransactions(filters);
      
      return new Promise((resolve, reject) => {
        const doc = new PDFDocument({ margin: 50 });
        const chunks = [];

        doc.on('data', chunk => chunks.push(chunk));
        doc.on('end', () => resolve(Buffer.concat(chunks)));
        doc.on('error', reject);

        // Header
        doc.fontSize(20).text('Fraud Detection Report', { align: 'center' });
        doc.moveDown();
        doc.fontSize(10).text(`Generated: ${new Date().toLocaleString()}`, { align: 'center' });
        doc.moveDown(2);

        // Summary stats
        const fraudCount = transactions.filter(t => t.prediction === 'fraud').length;
        const fraudRate = transactions.length > 0 
          ? ((fraudCount / transactions.length) * 100).toFixed(2) 
          : 0;

        doc.fontSize(12).text(`Total Transactions: ${transactions.length}`);
        doc.text(`Fraud Detected: ${fraudCount}`);
        doc.text(`Fraud Rate: ${fraudRate}%`);
        doc.moveDown(2);

        // Table header
        doc.fontSize(10).text('Transaction Details:', { underline: true });
        doc.moveDown();

        // Table rows
        transactions.forEach((t, index) => {
          if (index > 0 && index % 15 === 0) {
            doc.addPage();
          }

          doc.fontSize(8);
          doc.text(
            `ID: ${t.id} | $${t.amount} | ${t.device_type} | ${t.location} | ` +
            `${t.prediction} (${(t.fraud_probability * 100).toFixed(1)}%) | ` +
            `${new Date(t.transaction_time).toLocaleDateString()}`,
            { width: 500 }
          );
          doc.moveDown(0.5);
        });

        doc.end();
      });
    } catch (error) {
      throw new Error('PDF export failed: ' + error.message);
    }
  }

  // Helper: Get filtered transactions
  async getFilteredTransactions(filters) {
    const where = {};

    if (filters.startDate && filters.endDate) {
      where.transaction_time = {
        [Op.between]: [new Date(filters.startDate), new Date(filters.endDate)]
      };
    }

    if (filters.minAmount) {
      where.amount = { [Op.gte]: parseFloat(filters.minAmount) };
    }

    if (filters.maxAmount) {
      where.amount = { ...where.amount, [Op.lte]: parseFloat(filters.maxAmount) };
    }

    if (filters.prediction) {
      where.prediction = filters.prediction;
    }

    if (filters.device_type) {
      where.device_type = filters.device_type;
    }

    if (filters.location) {
      where.location = { [Op.like]: `%${filters.location}%` };
    }

    return await Transaction.findAll({
      where,
      order: [['created_at', 'DESC']],
      limit: filters.limit || 1000
    });
  }
}

module.exports = new ExportService();
