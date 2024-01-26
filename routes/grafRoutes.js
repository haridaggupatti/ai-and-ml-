const express = require('express');
const { fetchAccountGrowthData } = require('../controllers/grafController');
const router = express.Router();

router.get('/account-growth', async (req, res) => {
  try {
    const data = await fetchAccountGrowthData();
    res.json(data);
  } catch(error) {
    res.status(500).json({ message: 'Failed to fetch account growth data.' });
  }
});

module.exports = router;
