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
      pauseCommands: JSON.parse(process.env.PAUSE_COMMANDS || '{}'),
    },
    features: {
      showPauseMessages: process.env.ENABLE_PAUSE_MESSAGES === 'true',
      showMissingPermissionMessages: process.env.ENABLE_MISSING_PERMISSION_MESSAGES === 'true',
      showResumeMessages: process.env.ENABLE_RESUME_MESSAGES === 'true'
    },
    response: {
      delayMin: process.env.RESPONSE_DELAY_MIN ? parseInt(process.env.RESPONSE_DELAY_MIN) : 3,
      delayMax: process.env.RESPONSE_DELAY_MAX ? parseInt(process.env.RESPONSE_DELAY_MAX) : 6
    }
  };