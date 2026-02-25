const express = require('express');
const router = express.Router();
const auditController = require('../controllers/auditController');
const { isAuthenticated } = require('../middleware/authMiddleware');

router.get('/', isAuthenticated, auditController.showAuditLogs);

module.exports = router;