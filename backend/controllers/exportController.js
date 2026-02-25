const Transaction = require('../models/Transaction');
const { Op } = require('sequelize');

exports.showExportPage = (req, res) => {
  res.render('export', { message: null });
};
exports.exportPDF = async (req, res) => {
  try {
    const { startDate, endDate, prediction } = req.query;

    // Build filter
    const where = {};
    if (startDate && endDate) {
      where.transaction_time = {
        [Op.between]: [new Date(startDate), new Date(endDate)]
      };
    }
    if (prediction) {
      where.prediction = prediction;
    }

    const transactions = await Transaction.findAll({
      where,
      order: [['transaction_time', 'DESC']],
      limit: 100
    });

    // Create PDF
    const doc = new PDFDocument({ margin: 50 });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=fraud-report-${Date.now()}.pdf`);

    doc.pipe(res);

    // Title
    doc.fontSize(20).text('Fraud Detection Report', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Generated: ${new Date().toLocaleString()}`, { align: 'center' });
    doc.moveDown(2);

    // Summary
    const fraudCount = transactions.filter(t => t.prediction === 'fraud').length;
    const totalAmount = transactions.reduce((sum, t) => sum + parseFloat(t.amount), 0);

    doc.fontSize(14).text('Summary', { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(11);
    doc.text(`Total Transactions: ${transactions.length}`);
    doc.text(`Fraud Detected: ${fraudCount}`);
    doc.text(`Fraud Rate: ${((fraudCount / transactions.length) * 100).toFixed(2)}%`);
    doc.text(`Total Amount: $${totalAmount.toFixed(2)}`);
    doc.moveDown(2);

    // Transactions Table
    doc.fontSize(14).text('Transactions', { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(9);

    const tableTop = doc.y;
    const colWidths = [40, 80, 80, 70, 80, 60, 60];

    // Table headers
    doc.text('ID', 50, tableTop);
    doc.text('Amount', 90, tableTop);
    doc.text('Time', 170, tableTop);
    doc.text('Device', 250, tableTop);
    doc.text('Location', 320, tableTop);
    doc.text('Prediction', 400, tableTop);
    doc.text('Prob%', 460, tableTop);

    doc.moveTo(50, tableTop + 15).lineTo(520, tableTop + 15).stroke();

    let y = tableTop + 25;

    transactions.slice(0, 20).forEach(t => {
      if (y > 700) {
        doc.addPage();
        y = 50;
      }

      doc.text(t.id, 50, y);
      doc.text(`$${parseFloat(t.amount).toFixed(2)}`, 90, y);
      doc.text(new Date(t.transaction_time).toLocaleDateString(), 170, y);
      doc.text(t.device_type, 250, y);
      doc.text(t.location.substring(0, 15), 320, y);
      doc.text(t.prediction, 400, y);
      doc.text((t.fraud_probability * 100).toFixed(1), 460, y);

      y += 20;
    });

    doc.end();

  } catch (error) {
    console.error('PDF export error:', error);
    res.status(500).send('PDF export failed');
  }
};
exports.exportCSV = async (req, res) => {
  try {
    const { startDate, endDate, prediction } = req.query;

    // Build filter
    const where = {};
    if (startDate && endDate) {
      where.transaction_time = {
        [Op.between]: [new Date(startDate), new Date(endDate)]
      };
    }
    if (prediction) {
      where.prediction = prediction;
    }

    const transactions = await Transaction.findAll({
      where,
      order: [['transaction_time', 'DESC']]
    });

    // Generate CSV
    let csv = 'ID,Amount,Transaction Time,Device,Location,Prediction,Probability,Created At\n';
    
    transactions.forEach(t => {
      csv += `${t.id},${t.amount},${t.transaction_time},${t.device_type},${t.location},${t.prediction},${t.fraud_probability},${t.created_at}\n`;
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=fraud-report-${Date.now()}.csv`);
    res.send(csv);

  } catch (error) {
    console.error('CSV export error:', error);
    res.status(500).send('Export failed');
  }
};

exports.exportJSON = async (req, res) => {
  try {
    const { startDate, endDate, prediction } = req.query;

    // Build filter
    const where = {};
    if (startDate && endDate) {
      where.transaction_time = {
        [Op.between]: [new Date(startDate), new Date(endDate)]
      };
    }
    if (prediction) {
      where.prediction = prediction;
    }

    const transactions = await Transaction.findAll({
      where,
      order: [['transaction_time', 'DESC']]
    });

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename=fraud-report-${Date.now()}.json`);
    res.json(transactions);

  } catch (error) {
    console.error('JSON export error:', error);
    res.status(500).send('Export failed');
  }
};