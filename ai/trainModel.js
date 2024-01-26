const tf = require('../utils/tf');
const { buildModel } = require('./strategyModel');
const dataPreprocessor = require('./dataPreprocessor');

const trainModel = async (historicalData, strategyParameters) => {
  const { lookbackPeriod } = strategyParameters;
  const { xs, ys } = dataPreprocessor.prepareTrainingData(historicalData, lookbackPeriod);

  const model = buildModel(xs.shape[1]);

  await model.fit(xs, ys, {
    batchSize: 32,
    epochs: 100,
    validationSplit: 0.2,
  });

  return model;
};

module.exports = {
  trainModel,
};