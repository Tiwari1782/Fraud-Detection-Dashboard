const express = require('express');
const router = express.Router();
const exportController = require('../controllers/exportController');
const { isAuthenticated } = require('../middleware/authMiddleware');
const { logAction } = require('../middleware/auditMiddleware');

router.get('/', isAuthenticated, exportController.showExportPage);
router.get('/csv', isAuthenticated, exportController.exportCSV);
router.get('/json', isAuthenticated, exportController.exportJSON);
router.get('/pdf', isAuthenticated, logAction('EXPORT_PDF'), exportController.exportPDF); // NEW
module.exports = router;