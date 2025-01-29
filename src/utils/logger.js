const chalk = require('chalk');

const getTimestamp = () => {
  const date = new Date();
  return `${date.getDate().toString().padStart(2, '0')}-${
    (date.getMonth() + 1).toString().padStart(2, '0')}-${
    date.getFullYear()} ${
    date.getHours().toString().padStart(2, '0')}:${
    date.getMinutes().toString().padStart(2, '0')}`;
};

module.exports = {
  info: (message) => console.log(chalk.gray`[${getTimestamp()}] ` + chalk.cyan(message)),
  success: (message) => console.log(chalk.gray`[${getTimestamp()}] ` + chalk.green(message)),
  warn: (message) => console.log(chalk.gray`[${getTimestamp()}] ` + chalk.yellow(message)),
  error: (message) => console.log(chalk.gray`[${getTimestamp()}] ` + chalk.red(message)),
};