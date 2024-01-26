const ExternalLearningService = require('./externalLearningService');

class RiskManagementService {
  constructor(model, externalLearningEndpoint) {
    this.model = model;
    this.externalLearningService = new ExternalLearningService(externalLearningEndpoint);
  }

  async updateModelWithExternalData() {
    const information = await this.externalLearningService.gatherInformation();
    await this.model.updateModelWithExternalData(information);
  }

  async calculateRiskParameters(marketData) {
    const riskParameters = await this.model.predict(marketData);
    const stopLossLevel = riskParameters.stopLoss;
    const takeProfitLevel = riskParameters.takeProfit;
    return {
      stopLoss: stopLossLevel,
      takeProfit: takeProfitLevel
    };
  }
}

module.exports = RiskManagementService;
