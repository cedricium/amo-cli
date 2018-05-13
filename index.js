// node-config looks for the config directory in `pwd` - throwing warnings when
// not found. Setting the `NODE_CONFIG_DIR` fixes this issue.
// Refs: https://github.com/lorenwest/node-config/wiki/Configuration-Files#config-directory
process.env['NODE_CONFIG_DIR'] = __dirname + '/config/';

const path = require('path');
const minimist = require('minimist');
const {error} = require('./utils');

module.exports = () => {
  const args = minimist(process.argv.slice(2));

  // if no command given, default to 'help' command
  let cmd = args._[0] || 'help';

  if (args.v || args.version) {
    cmd = 'version';
  }

  if (args.h || args.help) {
    cmd = 'help';
  }

  switch (cmd) {
    case 'featured':
      require('./cmds/featured')(args);
      break;

    case 'search':
      require('./cmds/search')(args);
      break;

    case 'locale':
      const fileName = path.resolve(__dirname, 'config', 'default.json');
      const configFile = require(fileName);
      require('./cmds/locale')(configFile, fileName);
      break;

    case 'version':
      require('./cmds/version')(args);
      break;

    case 'help':
      require('./cmds/help')(args);
      break;

    default:
      error(`"${cmd}" is not a valid command!`, true);
      break;
  }
};
