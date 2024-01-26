const express = require('express');
const TradingOrchestrator = require('../services/tradingOrchestrator');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();
const tradingOrchestrator = new TradingOrchestrator();
router.post('/start-demo-trading', authMiddleware, async (req, res) => {
  try {
    await tradingOrchestrator.startDemoTrading(req.user);
    res.status(200).json({ message: 'Demo trading started successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Demo trading could not be started.', error: error.message });
  }
});
module.exports = router;
