# Tangia Bot

A Twitch chat bot designed to automatically join Tangia Dungeons and Boss Fights, with additional features for streamers and moderators.

## Features

- **Auto-Join**: Automatically joins Tangia Dungeons and Boss Fights when detected in chat.
- **Channel-Specific Control**: Supports multiple channels with independent configurations.
- **Pause Functionality**: Allows authorized users to pause the bot for a specified duration.
- **Customizable Permissions**: Define which users can control the bot on each channel.
- **Token Refresh**: Automatically refreshes Twitch OAuth tokens when expired.
- **Logging**: Detailed logging with timestamps and color-coded messages.

## Installation

### Prerequisites

- Node.js (v18 or higher)
- npm (included with Node.js)
- Docker (optional, for containerized deployment)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/Cacus3/tangia-bot.git
   cd tangia-bot
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example` and fill in the required values:
   ```bash
   cp .env.example .env
   ```

4. Start the bot:
   ```bash
   npm start
   ```

### Docker Deployment

1. Build the Docker image:
   ```bash
   docker-compose build
   ```

2. Start the container:
   ```bash
   docker-compose up -d
   ```

3. View logs:
   ```bash
   docker-compose logs -f
   ```

## Configuration

### Environment Variables

| Variable                             | Description                                                                                            |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `TWITCH_CLIENT_ID`                   | Your Twitch application client ID.                                                                     |
| `TWITCH_CLIENT_SECRET`               | Your Twitch application client secret.                                                                 |
| `BOT_USERNAME`                       | The username of your Twitch bot account.                                                               |
| `CHANNELS`                           | Comma-separated list of channels to join (e.g., `"channel1,channel2"`).                                |
| `INITIAL_ACCESS_TOKEN`               | Initial OAuth access token for the bot.                                                                |
| `INITIAL_REFRESH_TOKEN`              | Initial OAuth refresh token for the bot.                                                               |
| `ALLOWED_USERS`                      | JSON object mapping channels to allowed users for moderate bot (e.g., `{"channel1":["user1"]}`).                        |
| `STOP_DURATIONS`                     | JSON object mapping channels to stop durations in minutes (e.g., `{"channel1":30}`).                   |
| `PAUSE_COMMANDS`                     | JSON object mapping channels to pause commands (e.g., `{"channel1":["!pausebot", "!stoptangiabot"]}`). |
| `ENABLE_PAUSE_MESSAGES`              | Set to `true` to enable showing pause messages when bot is paused.                                     |
| `ENABLE_MISSING_PERMISSION_MESSAGES` | Set to `true` to enable showing missing permission messages.                                           |
| `ENABLE_RESUME_MESSAGES`             | Set to `true` to enable showing resume messages when the bot is resumed.                               |
| `PAUSE_MESSAGE`                      | Message to display when bot is paused, uses placeholders `{username}`, `{duration}`, and `{channel}`.  |
| `RESUME_MESSAGE`                     | Message to display when bot is resumed, uses placeholders `{username}` and `{channel}`.                |
| `MISSING_PERMISSION_MESSAGE`         | Message to display when a user lacks permission, uses placeholder `{username}`.                        |

### Example `.env` File

```env
TWITCH_CLIENT_ID=your_client_id
TWITCH_CLIENT_SECRET=your_client_secret
BOT_USERNAME=your_bot_name
CHANNELS="channel1,channel2"
INITIAL_ACCESS_TOKEN=oauth_token
INITIAL_REFRESH_TOKEN=refresh_token
ALLOWED_USERS='{"channel1":["user1","user2"],"channel2":["user3"]}'
STOP_DURATIONS='{"channel1":30,"channel2":60}'
ENABLE_PAUSE_MESSAGES=true
ENABLE_MISSING_PERMISSION_MESSAGES=true
ENABLE_RESUME_MESSAGES=true
PAUSE_MESSAGE="⏸️ Bot stopped for {duration} minutes!"
RESUME_MESSAGE="▶️ Bot active!"
MISSING_PERMISSION_MESSAGE="@{username}, Missing permissions!"
```

## Usage

### Commands

- **Auto-Join**: The bot automatically joins Dungeons and Boss Fights when detected in chat.
- **!stopTangiaBot**: Pauses the bot for a specified duration (only for authorized users).

### Example Scenarios

1. **Auto-Join**:
   - When `tangiabot` posts: `Player123 started a Tangia Dungeon! Use !join to join the party.`
   - The bot responds with: `!join`

2. **Pause Bot**:
   - An authorized user types: `!stoptangiabot`
   - The bot responds: `⏸️ Bot paused for {duration} minutes!`
   - After the duration, the bot resumes: `▶️ Bot active!`

## Project Structure

```
tangia-bot/
├── src/
│   ├── config/            # Configuration files
│   ├── services/          # Core bot functionality
│   ├── utils/             # Utility functions (e.g., logging)
│   └── index.js           # Main entry point
├── .env.example           # Example environment variables
├── docker-compose.yml     # Docker Compose configuration
├── Dockerfile             # Dockerfile for containerization
├── package.json           # Node.js dependencies and scripts
└── README.md              # This file
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Submit a pull request with a detailed description of your changes.

## License

This project is licensed under the [MPL 2.0 License](https://www.mozilla.org/en-US/MPL/2.0/).

## Support

For issues or questions, please open an issue on the [GitHub repository](https://github.com/Cacus3/Tangia-bot/issues).

---

**Happy streaming!** 🎮
