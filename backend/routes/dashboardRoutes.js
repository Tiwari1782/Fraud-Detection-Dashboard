const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { isAuthenticated } = require('../middleware/authMiddleware');

router.get('/', isAuthenticated, dashboardController.showDashboard);
router.get('/api/fraud-stats', isAuthenticated, dashboardController.getFraudStats);
router.get('/api/device-stats', isAuthenticated, dashboardController.getDeviceStats);
router.get('/api/location-stats', isAuthenticated, dashboardController.getLocationStats);
router.get('/api/fraud-trend', isAuthenticated, dashboardController.getFraudTrend);

module.exports = router;