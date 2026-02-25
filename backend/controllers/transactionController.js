const Transaction = require('../models/Transaction');
const aiFraudService = require('../services/aiFraudService');
const emailService = require('../services/emailService');
const { Op } = require('sequelize');

exports.showAddTransaction = (req, res) => {
  res.render('addTransaction', { error: null, success: null });
};

exports.addTransaction = async (req, res) => {
  try {
    const { amount, transaction_time, device_type, location } = req.body;

    // Validation
    if (!amount || !transaction_time || !device_type || !location) {
      return res.render('addTransaction', { 
        error: 'All fields are required', 
        success: null,
        prediction: null,
        probability: null
      });
    }

    if (parseFloat(amount) <= 0) {
      return res.render('addTransaction', { 
        error: 'Amount must be positive', 
        success: null,
        prediction: null,
        probability: null
      });
    }

    // Get AI prediction
    const aiResult = await aiFraudService.detectFraud({
      amount,
      transaction_time,
      device_type,
      location
    });

    // Save to database
    const transaction = await Transaction.create({
      amount,
      transaction_time,
      device_type,
      location,
      prediction: aiResult.prediction,
      fraud_probability: aiResult.fraud_probability
    });

    // Send email alert if high risk
    if (aiResult.fraud_probability >= 0.7) {
      const emailService = require('../services/emailService');
      await emailService.sendHighRiskAlert(transaction);
    }

    res.render('addTransaction', { 
      error: null, 
      success: `Transaction #${transaction.id} added successfully!`,
      prediction: aiResult.prediction,
      probability: (aiResult.fraud_probability * 100).toFixed(1)
    });

  } catch (error) {
    console.error('Add transaction error:', error);
    res.render('addTransaction', { 
      error: 'Failed to process transaction', 
      success: null,
      prediction: null,
      probability: null
    });
  }
};

exports.showAddTransaction = (req, res) => {
  res.render('addTransaction', { 
    error: null, 
    success: null,
    prediction: null,
    probability: null
  });
};

exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      order: [['created_at', 'DESC']],
      limit: 100
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};

// NEW: Transaction list with filters and pagination
exports.showTransactionList = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 20;
    const offset = (page - 1) * limit;

    // Build filter conditions
    const where = {};
    
    if (req.query.prediction) {
      where.prediction = req.query.prediction;
    }
    
    if (req.query.device_type) {
      where.device_type = req.query.device_type;
    }

    if (req.query.minAmount) {
      where.amount = { ...where.amount, [Op.gte]: parseFloat(req.query.minAmount) };
    }

    if (req.query.maxAmount) {
      where.amount = { ...where.amount, [Op.lte]: parseFloat(req.query.maxAmount) };
    }

    // Sorting
    const sortBy = req.query.sortBy || 'created_at';
    const order = req.query.order || 'DESC';

    // Fetch transactions
    const { count, rows } = await Transaction.findAndCountAll({
      where,
      order: [[sortBy, order]],
      limit,
      offset
    });

    const totalPages = Math.ceil(count / limit);

    res.render('transactionList', {
      transactions: rows,
      currentPage: page,
      totalPages,
      totalCount: count,
      filter: {
        prediction: req.query.prediction || '',
        device_type: req.query.device_type || '',
        minAmount: req.query.minAmount || '',
        maxAmount: req.query.maxAmount || '',
        sortBy,
        order
      }
    });

  } catch (error) {
    console.error('Transaction list error:', error);
    res.status(500).send('Error loading transactions');
  }
};