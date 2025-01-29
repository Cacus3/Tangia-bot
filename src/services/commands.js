const logger = require('../utils/logger');
const config = require('../config');

const pauseStates = new Map();

module.exports = {
  handleStopCommand: (client, channel, username) => {
    const channelName = channel.slice(1).toLowerCase();
    
    if (!config.commands.allowedUsers[channelName]?.includes(username.toLowerCase())) {
      logger.warn(`Unauthorized stop attempt by ${username} in ${channel}`);
      return; // client.say(channel, `@${username}, Missing permissions!`);
    }

    if (pauseStates.has(channel)) {
      return; //return client.say(channel, 'Bot already paused!');
    }

    const duration = (config.commands.stopDurations[channelName] || 30) * 60 * 1000;
    pauseStates.set(channel, true);

    logger.warn(`Bot paused in ${channel} for ${duration/60000} minutes`);
    client.say(channel, `⏸️ Bot zatrzymany na ${duration/60000} minut! Pozdro Gity!`);

    setTimeout(() => {
      pauseStates.delete(channel);
      logger.success(`Bot resumed in ${channel}`);
      //client.say(channel, '▶️ Bot active!');
    }, duration);
  },
  isPaused: (channel) => pauseStates.has(channel)
};