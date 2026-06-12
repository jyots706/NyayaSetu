const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { generateDraft } = require('../controllers/legalController');

router.post('/draft', protect, generateDraft);

module.exports = router;
