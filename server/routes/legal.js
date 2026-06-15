const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { askLegalQuestion } = require('../controllers/legalController');

// @route   POST /api/legal/ask
// @desc    Ask a legal question
// @access  Private
router.post('/ask', protect, askLegalQuestion);

module.exports = router;
