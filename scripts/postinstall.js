#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Dirty way to bypass TravisCI build process failing due to a timeout
// waiting for inquirer inputs. Will need to revisit.
if (process.env.USE_DETECTED_LOCALE) {
  process.exit(0);
}

const configDir = path.join(__dirname, '..', 'config');

if (!fs.existsSync(configDir)) {
  fs.mkdirSync(configDir);
  const localeSetting = {locale: ''};
  fs.writeFileSync(
    path.resolve(configDir, 'default.json'),
    JSON.stringify(localeSetting, null, 2),
    {flags: 'as'}
  );
}

const fileName = path.resolve(configDir, 'default.json');
const configFile = require(fileName);

// Setup locale setting
require('../cmds/locale')(configFile, fileName, displayReadyMessage);

function displayReadyMessage() {
  console.log(`You're all set. Use 'amo help' to learn how to get started.
  If you would like to change your locale, run 'amo locale'. Enjoy!`);
}
