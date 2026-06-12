const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { protect } = require('../middleware/authMiddleware');
const { handleVoiceUpload } = require('../controllers/voiceController');

router.post('/upload', protect, upload.single('audio'), handleVoiceUpload);

module.exports = router;
