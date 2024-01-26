const { applyFeedbackToStrategy } = require('../services/strategyService');
const NewsAnalysisService = require('../services/newsAnalysisService');

exports.makeDecision = async (userId, baseStrategyConfig, marketData) => {
  let strategyConfig = await applyFeedbackToStrategy(userId, baseStrategyConfig);
  const newsAnalysisService = new NewsAnalysisService('https://example.com/news'); // INPUT_REQUIRED: Replace with actual news URL
  const articles = await newsAnalysisService.fetchLatestNews();
  const analyzedArticles = newsAnalysisService.analyzeSentiment(articles);
  const averageSentiment = analyzedArticles.reduce((sum, article) => sum + article.sentimentScore, 0) / analyzedArticles.length;
  let decision;
  if (averageSentiment > 0) {
    decision = strategyConfig.increaseInvestment();
  } else if (averageSentiment < 0) {
    decision = strategyConfig.decreaseInvestment();
  } else {
    decision = strategyConfig.baseStrategy();
  }
  return decision;
};
