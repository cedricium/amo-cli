const fs = require('fs');
const inquirer = require('inquirer');
const osLocale = require('os-locale');
const {countries} = require('../utils');

module.exports = (configFile, fileName, callback) => {
  // Getting the user's system locale...
  // Regex .replace() used to replace '_' with '-'. Something like
  // 'en_US' will not work when passed into the .toLocaleString() method.
  let userLocale = osLocale.sync().replace(/_/g, '-');

  const questions = [
    {
      message: `Use detected system locale (${userLocale}) for AMO queries?`,
      type: 'confirm',
      name: 'useSystemLocale',
      default: true,
    }, {
      // Only prompt 'localeSelection' if 'useSystemLocale' returned false
      when: (response) => {
        return !response.useSystemLocale;
      },
      message: 'What is your preferred locale?',
      type: 'list',
      name: 'localeSelection',
      // incomplete locale list - will be updated as I see more locales
      // good add-ons to test for correct locale being applied: Ghostery, Ecosia
      //   Adblock Plus, uBlock Origin
      choices: countries,
    },
  ];

  inquirer.prompt(questions)
  .then((answers) => {
    userLocale = (answers.localeSelection)
      ? answers.localeSelection
      : userLocale;
    // Setting user locale to the config file
    configFile.locale = userLocale;
    fs.writeFile(fileName, JSON.stringify(configFile, null, 2), (err) => {
      if (err) throw err;
      console.log(`Successfully set the user locale as: ${userLocale}`);
      if (callback) {
        callback();
      }
    });
  });
};
