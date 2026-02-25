const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');
const { isAuthenticated } = require('../middleware/authMiddleware');
const { logAction } = require('../middleware/auditMiddleware');

router.get('/', isAuthenticated, settingsController.showSettings);
router.post('/', isAuthenticated, logAction('UPDATE_SETTINGS'), settingsController.updateSettings);

module.exports = router;