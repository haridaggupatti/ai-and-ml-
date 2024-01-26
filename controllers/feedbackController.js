const Feedback = require('../models/Feedback');

exports.submitFeedback = async (req, res) => {
  const { userId, strategyAdjustments } = req.body;

  try {
    const feedback = new Feedback({
      userId,
      strategyAdjustments
    });
    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully', feedback });
  } catch(error) {
    res.status(500).json({ message: 'Failed to submit feedback', error: error.message });
  }
};

exports.getLatestFeedback = async (req, res) => {
  const userId = req.user._id;

  try {
    const latestFeedback = await Feedback.findOne({ userId }).sort({ createdAt: -1 });
    res.status(200).json(latestFeedback);
  } catch(error) {
    res.status(500).json({ message: 'Failed to fetch latest feedback', error: error.message });
  }
};
