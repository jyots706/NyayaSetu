const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { protect } = require('../middleware/authMiddleware');
const { uploadDocument, getCaseDocuments } = require('../controllers/documentController');
const { handleOcrProcess } = require('../controllers/ocrController');

// Upload document
router.post('/upload', protect, upload.single('document'), uploadDocument);

// Get documents by case ID
router.get('/:caseId', protect, getCaseDocuments);

// Trigger OCR processing
router.post('/ocr', protect, handleOcrProcess);

module.exports = router;
