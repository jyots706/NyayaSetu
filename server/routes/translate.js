const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { translateText } = require('../controllers/translateController');

router.post('/', protect, translateText);

module.exports = router;
