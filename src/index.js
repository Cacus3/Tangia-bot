require('dotenv').config();
const tmi = require('tmi.js');
const logger = require('./utils/logger');
const config = require('./config');
const auth = require('./services/auth');
const commands = require('./services/commands');

const client = new tmi.Client({
  options: { debug: false },
  identity: {
    username: config.twitch.botUsername,
    password: auth.getCurrentToken()
  },
  channels: config.twitch.channels
});

client.on('message', (channel, tags, message, self) => {
  if (commands.isPaused(channel)) return;

  const username = tags.username.toLowerCase();
  const msg = message.trim().toLowerCase();

  if (msg === '!stoptangiabot') {
    return commands.handleStopCommand(client, channel, username);
  }

  if (username === 'tangiabot' && /^\w+ started a Tangia (Dungeon|Boss Fight)/.test(msg)) {
    client.say(channel, '!join').catch(logger.error);
    logger.success(`Joined event in ${channel}`);
  }
});

client.on('disconnected', async (reason) => {
  logger.warn(`Disconnected: ${reason}`);
  if (reason.includes('authentication failed')) {
    client.opts.identity.password = await auth.refreshTokens();
    client.connect();
  }
});

client.connect()
  .then(() => logger.success(`Bot running on: ${config.twitch.channels.join(', ')}`))
  .catch(error => {
    logger.error(`Connection failed: ${error.message}`);
    process.exit(1);
  });