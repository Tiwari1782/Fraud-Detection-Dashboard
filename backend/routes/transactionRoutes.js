const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const { isAuthenticated } = require('../middleware/authMiddleware');

router.get('/add', isAuthenticated, transactionController.showAddTransaction);
router.post('/add', isAuthenticated, transactionController.addTransaction);
router.get('/all', isAuthenticated, transactionController.getAllTransactions);
router.get('/list', isAuthenticated, transactionController.showTransactionList); // NEW

module.exports = router;