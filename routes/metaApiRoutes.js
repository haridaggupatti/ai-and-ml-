const express = require('express');
const MetaApiConnection = require('../utils/metaApiConnection');
const router = express.Router();

router.get('/test-connection', async (req, res) => {
  const metaApiKey = process.env.META_API_KEY; // INPUT_REQUIRED {Put your MetaApi key here}
  const accountId = process.env.META_API_ACCOUNT_ID; // INPUT_REQUIRED {Put your MetaApi account ID here}

  try {
    const metaApiConnection = new MetaApiConnection(metaApiKey, accountId);
    await metaApiConnection.connect();
    res.status(200).json({ message: 'Successfully connected to MetaTrader.' });
  } catch (error) {
    res.status(500).json({ message: `Failed to connect to MetaTrader: ${error.message}` });
  }
});

module.exports = router;
