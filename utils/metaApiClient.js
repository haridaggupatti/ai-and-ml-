const { MetaApi } = require('metaapi.cloud-sdk');

class MetaApiClient {
  constructor(metaApiKey) {
    if (!metaApiKey) {
      throw new Error('MetaApi key is missing.');
    }
    this.api = new MetaApi(metaApiKey);
  }

  async connectToAccount(accountId) {
    try {
      const account = await this.api.metatraderAccountApi.getAccount(accountId);
      const connection = await account.connect();
      console.log(`Connected to MetaTrader account, connection id is ${connection.id}.`);
      return connection;
    } catch (error) {
      console.error(`Error during MetaApi connection: ${error.message}`);
      throw error;
    }
  }

  async getMarketData(accountId, symbol, timeframe, startTime, endTime) {
    const connection = await this.connectToAccount(accountId);
    // Fetch the market data from MetaApi
    return await connection.getHistoricalMarketData(symbol, timeframe, startTime, endTime);
  }
}

module.exports = {
  MetaApiClient,
};
