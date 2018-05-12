#!/usr/bin/env node

/* eslint-disable max-len */

const fs = require('fs');
const path = require('path');
const {bold} = require('colors'); // eslint-disable-line no-unused-vars

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
  const readyMessage =
  `\n  You're' all set! Type ${`'amo help'`.bold} to learn how to get started. If
  you would like to change your locale in the future, run ${`'amo locale'`.bold}.\n`;

  console.log(readyMessage);
}
