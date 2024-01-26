const Feedback = require('../models/Feedback');

exports.applyFeedbackToStrategy = async (userId, currentStrategyConfig) => {
  const latestFeedbackEntry = await Feedback.findOne({ userId }).sort({ createdAt: -1 });

  if (!latestFeedbackEntry) {
    return currentStrategyConfig; // No feedback provided, return the current config unchanged.
  }

  for (const [parameter, adjustment] of latestFeedbackEntry.strategyAdjustments) {
    if (ParameterValidationService.isValidAdjustment(parameter, adjustment)) {
      currentStrategyConfig[parameter] += adjustment;
    }
    // Additional logic to validate and limit the adjustments can be added here.
  }

  return currentStrategyConfig;
};

// We would need additional validation here. Example service to validate adjustments:
class ParameterValidationService {
  static isValidAdjustment(parameter, value) {
    // Implement validation logic specific to each strategy parameter.
    return true; // replace with validation logic
  }
}
