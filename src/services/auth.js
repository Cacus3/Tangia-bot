const axios = require('axios');
const logger = require('../utils/logger');
const config = require('../config');

let accessToken = config.twitch.initialAccessToken;
let refreshToken = config.twitch.initialRefreshToken;

module.exports = {
  refreshTokens: async () => {
    try {
      logger.warn('Attempting token refresh...');
      const response = await axios.post('https://id.twitch.tv/oauth2/token', null, {
        params: {
          client_id: config.twitch.clientId,
          client_secret: config.twitch.clientSecret,
          grant_type: 'refresh_token',
          refresh_token: refreshToken
        }
      });

      accessToken = response.data.access_token;
      refreshToken = response.data.refresh_token;
      logger.success('Tokens refreshed successfully');
      
      return `oauth:${accessToken}`;
    } catch (error) {
      logger.error(`Token refresh failed: ${error.message}`);
      process.exit(1);
    }
  },
  getCurrentToken: () => `oauth:${accessToken}`
};