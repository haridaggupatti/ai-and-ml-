const express = require('express');
const { submitFeedback, getLatestFeedback } = require('../controllers/feedbackController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/submit', authMiddleware, submitFeedback);
router.get('/latest', authMiddleware, getLatestFeedback);

module.exports = router;
