const MetaApiConnection = require('../utils/metaApiConnection');
const RiskManagementService = require('../services/riskManagementService');
const RiskPredictionModel = require('../ai/riskPredictionModel');
const logger = require('../utils/logger');

class TradeController {
  constructor() {
    const metaApiKey = process.env.META_API_KEY;
    const accountId = process.env.META_API_ACCOUNT_ID;
    this.metaApiConnection = new MetaApiConnection(metaApiKey, accountId);
    const externalLearningEndpoint = 'https://external.api/learning-source';

    this.riskManagementService = new RiskManagementService(
      new RiskPredictionModel(),
      externalLearningEndpoint
    );
  }

  async executeTrade(marketData, tradeId) {
    try {
      const { stopLoss, takeProfit } = await this.riskManagementService.calculateRiskParameters(marketData);
      await this.metaApiConnection.applyRiskParameters(tradeId, stopLoss, takeProfit);
      logger.info(`Trade executed with stopLoss: ${stopLoss}, takeProfit: ${takeProfit}`);
      // Create trade order object
      const tradeOrder = {
        instrument: marketData.instrument,
        units: marketData.units,
        side: marketData.side,
        stopLoss: stopLoss,
        takeProfit: takeProfit
      };

      // Send the order to MetaApi for execution
      const executionResponse = await this.metaApiConnection.executeTrade(tradeOrder);
      return executionResponse;
    } catch (error) {
      logger.error(`Trade execution failure: ${error.message}`);
      throw error;
    }
  }
}

module.exports = TradeController;
