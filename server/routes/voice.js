const express = require('express');
const router = express.Router();
const { handleVoiceUpload } = require('../controllers/voiceController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// POST /transcribe using voiceController, use uploadMiddleware for audio file, protect with authMiddleware
router.post('/transcribe', protect, upload.single('audio'), handleVoiceUpload);

module.exports = router;
