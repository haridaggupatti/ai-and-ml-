const MetaApi = require('metaapi.cloud-sdk').default;

class MetaApiConnection {
  constructor(metaApiKey, accountId) {
    if (!metaApiKey || !accountId) {
      throw new Error('MetaApi key or account ID is missing.');
    }
    this.api = new MetaApi(metaApiKey);
    this.accountId = accountId;
  }

  async connect() {
    try {
      const account = await this.api.metatraderAccountApi.getAccount(this.accountId);
      const connection = await account.connect();
      console.log(`Connected to ${account.name}, connection id is ${connection.id}.`);
      return connection;
    } catch (error) {
      console.error(`Error during MetaApi connection: ${error.message}`);
      throw error;
    }
  }

  async applyRiskParameters(account, tradeId, stopLoss, takeProfit) {
    try {
      let modifyTradePayload = {
        type: 'POSITION_MODIFY',
        positionId: tradeId,
        stopLoss: stopLoss,
        takeProfit: takeProfit
      };
      await account.modifyPosition(tradeId, modifyTradePayload);
      console.log(`Modified trade ${tradeId} with stopLoss: ${stopLoss}, takeProfit: ${takeProfit}`);
    } catch (error) {
      console.error(`Error applying risk parameters to MetaTrader: ${error.message}`);
      throw error;
    }
  }
}

module.exports = MetaApiConnection;
