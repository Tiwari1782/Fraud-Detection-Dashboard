const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploadController = require('../controllers/uploadController');
const { isAuthenticated } = require('../middleware/authMiddleware');
const { logAction } = require('../middleware/auditMiddleware');

// Configure multer for file upload
const upload = multer({ dest: 'uploads/' });

router.get('/', isAuthenticated, uploadController.showUploadPage);
router.post('/', isAuthenticated, logAction('BULK_UPLOAD'), upload.single('csvFile'), uploadController.uploadCSV);
router.get('/sample', isAuthenticated, uploadController.downloadSampleCSV);

module.exports = router;