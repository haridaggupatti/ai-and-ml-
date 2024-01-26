const { MetaApiClient } = require('../utils/metaApiClient');
const dataPreprocessor = require('./dataPreprocessor');

class DataProcessor {
  constructor(metaApiConnection) {
    this.connection = metaApiConnection;
  }

  // Fetch real-time market data with given parameters and preprocess it
  async fetchAndPrepareData(accountId, symbol, timeframe, startTime, endTime) {
    const marketData = await this.connection.getMarketData(accountId, symbol, timeframe, startTime, endTime);
    const preparedData = dataPreprocessor.prepareTrainingData(marketData);
    return preparedData;
  }
}

module.exports = {
  DataProcessor,
};
