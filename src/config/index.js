module.exports = {
    twitch: {
      clientId: process.env.TWITCH_CLIENT_ID,
      clientSecret: process.env.TWITCH_CLIENT_SECRET,
      channels: process.env.CHANNELS.split(',').map(c => c.trim().toLowerCase()),
      botUsername: process.env.BOT_USERNAME,
      initialAccessToken: process.env.INITIAL_ACCESS_TOKEN,
      initialRefreshToken: process.env.INITIAL_REFRESH_TOKEN
    },
    commands: {
      allowedUsers: JSON.parse(process.env.ALLOWED_USERS || '{}'),
      stopDurations: JSON.parse(process.env.STOP_DURATIONS || '{}'),
      cooldowns: {
        join: 5000
      }
    }
  };