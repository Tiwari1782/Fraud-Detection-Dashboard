const { Op } = require('sequelize');
const Transaction = require('../models/Transaction');
const sequelize = require('../config/database');

exports.showDashboard = async (req, res) => {
  try {
    // Total transactions
    const totalTransactions = await Transaction.count();

    // Fraud count
    const fraudCount = await Transaction.count({
      where: { prediction: 'fraud' }
    });

    // Fraud rate
    const fraudRate = totalTransactions > 0 
      ? ((fraudCount / totalTransactions) * 100).toFixed(2) 
      : 0;

    // Recent high-risk transactions
    const highRiskTransactions = await Transaction.findAll({
      where: { fraud_probability: { [Op.gte]: 0.7 } },
      order: [['created_at', 'DESC']],
      limit: 5
    });

    res.render('dashboard', {
      totalTransactions,
      fraudCount,
      fraudRate,
      highRiskTransactions,
      username: req.session.username || 'Admin'
    });

  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).send('Error loading dashboard');
  }
};

// API endpoints for charts
exports.getFraudStats = async (req, res) => {
  try {
    const stats = await Transaction.findAll({
      attributes: [
        'prediction',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      group: ['prediction']
    });
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};

exports.getDeviceStats = async (req, res) => {
  try {
    const stats = await Transaction.findAll({
      attributes: [
        'device_type',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      group: ['device_type']
    });
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch device stats' });
  }
};

exports.getLocationStats = async (req, res) => {
  try {
    const stats = await Transaction.findAll({
      attributes: [
        'location',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      group: ['location'],
      order: [[sequelize.fn('COUNT', sequelize.col('id')), 'DESC']],
      limit: 10
    });
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch location stats' });
  }
};

exports.getFraudTrend = async (req, res) => {
  try {
    const trend = await Transaction.findAll({
      attributes: [
        [sequelize.fn('DATE', sequelize.col('transaction_time')), 'date'],
        [sequelize.fn('COUNT', sequelize.col('id')), 'total'],
        [sequelize.fn('SUM', sequelize.literal("CASE WHEN prediction = 'fraud' THEN 1 ELSE 0 END")), 'fraud_count']
      ],
      group: [sequelize.fn('DATE', sequelize.col('transaction_time'))],
      order: [[sequelize.fn('DATE', sequelize.col('transaction_time')), 'ASC']],
      limit: 30
    });
    res.json(trend);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch trend data' });
  }
};