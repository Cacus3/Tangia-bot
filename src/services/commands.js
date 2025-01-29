const logger = require('../utils/logger');
const config = require('../config');

const pauseStates = new Map();

function formatMessage(message, values) {
  if (!message) return '';
  return message.replace(/{(\w+)}/g, (match, key) => values[key] || match);
}

module.exports = {
  handleStopCommand: (client, channel, username) => {
    const channelName = channel.slice(1).toLowerCase();
    
    if (!config.commands.allowedUsers[channelName]?.includes(username.toLowerCase())) {
      logger.warn(`Unauthorized stop attempt by ${username} in ${channel}`);
      if (config.features.showMissingPermissionMessages) {
        const message = formatMessage(process.env.MISSING_PERMISSION_MESSAGE, { username, channel: channelName });
        client.say(channel, message);
      }
      return;
    }

    if (pauseStates.has(channel)) {
      if (config.features.showPauseMessages) {
        const message = formatMessage(process.env.ALREADY_PAUSED_MESSAGE, { channel: channelName });
        client.say(channel, message);
      }
      return;
    }

    const duration = (config.commands.stopDurations[channelName] || 30) * 60 * 1000;
    pauseStates.set(channel, true);

    logger.warn(`Bot paused in ${channel} for ${duration/60000} minutes`);
    const pauseMessage = formatMessage(process.env.PAUSE_MESSAGE, { username, duration: duration / 60000, channel: channelName });
    client.say(channel, pauseMessage);

    setTimeout(() => {
      pauseStates.delete(channel);
      logger.success(`Bot resumed in ${channel}`);
      if (config.features.showResumeMessages) {
        const resumeMessage = formatMessage(process.env.RESUME_MESSAGE, { username, channel: channelName });
        client.say(channel, resumeMessage);
      }
    }, duration);
  },
  isPaused: (channel) => pauseStates.has(channel)
};