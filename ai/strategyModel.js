const tf = require('../utils/tf');

const { sequential, layers } = tf;

// Define the model architecture
const buildModel = (inputShape) => {
  const model = sequential();
  model.add(layers.dense({ units: 64, activation: 'relu', inputShape: [inputShape] }));
  model.add(layers.dense({ units: 64, activation: 'relu' }));
  model.add(layers.dense({ units: 1, activation: 'sigmoid' }));

  model.compile({
    optimizer: tf.train.adam(),
    loss: 'binaryCrossentropy',
    metrics: ['accuracy'],
  });

  return model;
};

module.exports = {
  buildModel,
};