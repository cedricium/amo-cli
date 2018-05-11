#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const appDir = path.dirname(require.main.filename);
const osLocale = require('os-locale');
const fileName = path.resolve(__dirname, '..', 'config', 'default.json');
const configFile = require(fileName);
const { countries } = require('../utils');

// Getting the user's system locale...
let userLocale = osLocale.sync();

const questions = [
  {
    message: `Would you like to use the detected system locale (${userLocale}) for AMO queries?`,
    type: 'confirm',
    name: 'useSystemLocale',
    default: true
  }, {
    // Only prompt 'localeSelection' if 'useSystemLocale' returned false
    when: function (response) {
      return !response.useSystemLocale;
    },
    message: 'What is your preferred locale?',
    type: 'list',
    name: 'localeSelection',
    // incomplete locale list - will be updated as I see more locales
    // good add-ons to test for correct locale being applied: Ghostery, Ecosia
    //   Adblock Plus, uBlock Origin
    choices: countries
  }
];

inquirer.prompt(questions)
.then(answers => {
  userLocale = (answers.localeSelection) ? answers.localeSelection : userLocale;
  // Setting user locale to the config file
  configFile.locale = userLocale;
  fs.writeFile(fileName, JSON.stringify(configFile, null, 2), (err) => {
    if (err) throw err;
    console.log(`Successfully set the user locale as: ${userLocale}`);
    displayReadyMessage();
  });
});

const displayReadyMessage = () => {
  // You're all set. Use `amo help` to learn how to get started. Enjoy!
  // If you need to change your locale, run `amo locale`.
};
