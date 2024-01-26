const axios = require('axios');

class ExternalLearningService {
  constructor(apiEndpoint) {
    this.apiEndpoint = apiEndpoint;
  }

  async gatherInformation() {
    try {
      const response = await axios.get(this.apiEndpoint);
      const information = response.data.map(item => {
        const { title, summary, link } = item;
        return {
          title: title,
          description: summary,
          url: link
        };
      });
      return information;
    } catch (error) {
      console.error(`Error gathering external information: ${error.message}`);
      throw error;
    }
  }
}

module.exports = ExternalLearningService;
