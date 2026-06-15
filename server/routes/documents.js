const express = require('express');
const router = express.Router();
const { uploadDocument, getDocumentSummary } = require('../controllers/documentController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// @route   POST /api/documents/upload
// @desc    Upload a PDF document and process it
// @access  Private
router.post('/upload', protect, upload.single('document'), uploadDocument);

// @route   GET /api/documents/summary/:id
// @desc    Get summary of a specific document
// @access  Private
router.get('/summary/:id', protect, getDocumentSummary);

module.exports = router;
