// This utility file consolidates the TensorFlow.js import
try {
  require('@tensorflow/tfjs-node');
} catch (error) {
  console.error('Failed to load @tensorflow/tfjs-node:', error.message);
  // Fall back to using the standard TensorFlow.js package
  require('@tensorflow/tfjs');
}

module.exports = require('@tensorflow/tfjs');