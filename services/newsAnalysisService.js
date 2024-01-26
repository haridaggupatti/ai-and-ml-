const axios = require('axios');
const cheerio = require('cheerio');
const Sentiment = require('sentiment');

class NewsAnalysisService {
  constructor(newsUrl) {
    this.newsUrl = newsUrl;
    this.sentiment = new Sentiment();
  }

  async fetchLatestNews() {
    try {
      const response = await axios.get(this.newsUrl);
      const $ = cheerio.load(response.data);
      const articles = $('article').map((i, el) => {
        const headline = $(el).find('h2').text();
        const content = $(el).find('p').text();
        return { headline, content };
      }).get();
      return articles;
    } catch (error) {
      console.error(`Error fetching news articles: ${error.message}`);
      throw error;
    }
  }

  analyzeSentiment(articles) {
    return articles.map(article => {
      const result = this.sentiment.analyze(article.content);
      return { ...article, sentimentScore: result.score };
    });
  }
}

module.exports = NewsAnalysisService;
