const colors = require('colors');

const usage = 'Usage:'.bold;
const commands = 'Commands:'.blue;
const flags = 'Flags:'.blue;
const flagsOptional = '[flags]'.blue;
const note = 'Note:'.bold;
const amoLink = 'https://addons.mozilla.org'.blue;

const menus = {
  main: `${usage} amo <command> <args>

${`amo-cli is a CLI tool used to interact with the Firefox AMO (${amoLink}).`.bold}

${commands}
 ${'featured'.padEnd(16)} ${'list featured add-ons'.dim}
 ${'search'.padEnd(16)} ${'search through public add-ons'.dim}
 ${'version'.padEnd(16)} ${'show package version'.dim}
 ${'help'.padEnd(16)} ${'show help menu for a command'.dim}\n`,

  featured: `${usage} amo featured ${flagsOptional}

${'list featured add-ons matching some parameters'.bold}

${flags}
 ${'--language, -l'.padEnd(16)} ${'add-ons featured for this specific language'.dim}
 ${'--page-size, -p'.padEnd(16)} ${'the number of add-ons to get'.dim}
 ${'--show-url, -u'.padEnd(16)} ${`display the add-on's AMO url`.dim}
 ${'--type, -t'.padEnd(16)} ${'filter by add-on type'.dim}\n`,
 
  search: `${usage} amo search ${flagsOptional}

${'search through public add-ons with the ability to filter results'.bold}

${flags}
 ${'--query, -q'.padEnd(16)} ${'the search query (maximum allowed length is 100 characters'.dim}
 ${'--page-size, -p'.padEnd(16)} ${'the number of add-ons to get'.dim}
 ${'--show-url, -u'.padEnd(16)} ${`display the add-on's AMO url`.dim}
 ${'--sort, -s'.padEnd(16)} ${'sorting parameters'.dim}
 ${'--type, -t'.padEnd(16)} ${'filter by add-on type'.dim}\n`,
};

module.exports = (args) => {
  const subCmd = args._[0] === 'help'
    ? args._[1]
    : args._[0];

  console.log(menus[subCmd] || menus.main);
};
