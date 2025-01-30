const logger = require('../utils/logger');
const config = require('../config');

const pauseStates = new Map();

function formatMessage(message, values) {
  if (!message) return '';
  return message.replace(/{(\w+)}/g, (match, key) => values[key] || match);
}

module.exports = {
  handleStopCommand: (client, channelName, username, channel) => {
    
    if (!config.commands.allowedUsers[channelName]?.includes(username.toLowerCase())) {
      logger.warn(`Unauthorized stop attempt by ${username} in ${channelName}`);
      if (config.features.showMissingPermissionMessages) {
        const message = formatMessage(
          process.env.MISSING_PERMISSION_MESSAGE || "@{username}, you don't have permission!",
          { username, channel: channelName }
        );
        client.say(channel, message);
      }
      return;
    }

    if (pauseStates.has(channelName)) {
      if (config.features.showPauseMessages) {
        const message = formatMessage(
          process.env.ALREADY_PAUSED_MESSAGE || "⏸️ Bot is already paused in {channel}!",
          { channel: channelName }
        );
        client.say(channel, message);
      }
      return;
    }

    const durationMinutes = parseInt(config.commands.stopDurations[channelName] || 30, 10);
    const durationMs = durationMinutes * 60 * 1000;
    
    pauseStates.set(channelName, true);

    logger.warn(`Bot paused in ${channel} for ${durationMinutes} minutes`);
    const pauseMessage = formatMessage(
      process.env.PAUSE_MESSAGE || "⏸️ Bot paused for {duration} minutes in {channel}!",
      { username, duration: durationMinutes, channel: channelName }
    );
    client.say(channel, pauseMessage);

    setTimeout(() => {
      pauseStates.delete(channelName);
      logger.success(`Bot resumed in ${channel}`);
      if (config.features.showResumeMessages) {
        const resumeMessage = formatMessage(
          process.env.RESUME_MESSAGE || "▶️ Bot is now active in {channel}!",
          { username, channel: channelName }
        );
        client.say(channel, resumeMessage);
      }
    }, durationMs);
  },
  isPaused: (channel) => pauseStates.has(channel.slice(1).toLowerCase()),
};
