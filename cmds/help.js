/* eslint-disable max-len */

const colors = require('colors'); // eslint-disable-line no-unused-vars

const usage = 'Usage:'.bold;
const commands = 'Commands:'.blue;
const flags = 'Flags:'.blue;
const flagsOptional = '[flags]'.blue;
const amoLink = 'https://addons.mozilla.org'.blue;

const menus = {
  main: `${usage} amo <command> <args>

${`amo-cli is a CLI tool used to interact with the Firefox AMO (${amoLink}).`.bold}

${commands}
 ${'featured'.padEnd(18)} ${'list featured add-ons'.dim}
 ${'search'.padEnd(18)} ${'search through public add-ons'.dim}
 ${'version'.padEnd(18)} ${'show package version'.dim}
 ${'help'.padEnd(18)} ${'show help menu for a command'.dim}

${`Settings-specific commands`.blue}:
 ${'locale'.padEnd(18)} ${'change the selected locale'.dim}

See 'amo help <command>' to read about a specific subcommand.\n`,

  featured: `${usage} amo featured ${flagsOptional}

${'list featured add-ons matching some parameters'.bold}

${flags}
 ${'-i, --interactive'.padEnd(18)} ${'allows for selecting add-ons to explore their details'.dim}
 ${'-p, --page-size'.padEnd(18)} ${'the number of add-ons to get'.dim}
 ${'-u, --show-url'.padEnd(18)} ${`display the add-on's AMO url`.dim}
 ${'-t, --type'.padEnd(18)} ${'filter by add-on type'.dim}\n`,

  search: `${usage} amo search ${flagsOptional}

${'search through public add-ons with the ability to filter and sort results'.bold}

${flags}
 ${'-i, --interactive'.padEnd(18)} ${'allows for selecting add-ons to explore their details'.dim}
 ${'-q, --query'.padEnd(18)} ${'the search query (maximum allowed length is 100 characters)'.dim}
 ${'-p, --page-size'.padEnd(18)} ${'the number of add-ons to display'.dim}
 ${'-u, --show-url'.padEnd(18)} ${`display the add-on's AMO url`.dim}
 ${'-s, --sort'.padEnd(18)} ${'sorting parameters'.dim}
 ${'-t, --type'.padEnd(18)} ${'filter by add-on type'.dim}\n`,

  locale: `${usage} amo locale

  ${'launch the locale selection prompt, overriding the previously-set locale'.bold}\n`,
};

module.exports = (args) => {
  const subCmd = args._[0] === 'help'
    ? args._[1]
    : args._[0];

  console.log(menus[subCmd] || menus.main);
};
