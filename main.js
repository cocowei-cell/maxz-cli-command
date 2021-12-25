const { Command } = require("commander");
const chalk = require("chalk");
const program = new Command("mz");

require('./commander').forEach(({ command, description, usage, action }) => {
  program
    .command(command)
    .description(description)
    .usage(`${chalk.green(usage)}`)
    .action(action)
})

program.usage(require('./package.json').description)
program.version(require('./package.json').version).parse(process.argv)
// https://registry.npm.taobao.org/
// https://registry.npmjs.org/
process.on('uncaughtException', (err) => {
  console.log(chalk.red(err.message));
  process.exit(0)
})
process.on('unhandledRejection', (err) => {
  console.log(chalk.red(err.message));
  process.exit(0)
})