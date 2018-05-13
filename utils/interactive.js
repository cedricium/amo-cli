const colors = require('colors'); // eslint-disable-line no-unused-vars
const inquirer = require('inquirer');
const {getLocale} = require('../utils');

module.exports = (args) => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'addonSelection',
      message: 'Which add-on would you like to explore:',
      choices: args,
      pageSize: 115,
    },
  ])
  .then((answers) => {
    selectedAddon = filterValue(args, 'name', answers.addonSelection);
    showAddonDetails(selectedAddon);
  });
};

const filterValue = (obj, key, value) => obj.find((v) => v[key] === value);

const showAddonDetails = (addon) => {
  const locale = getLocale();
  const addonName = addon.name;
  const addonAuthors = addon.authors[0].name;
  // below .toLocaleString() only works with en-US locale currently
  // refs: https://stackoverflow.com/a/23200062/6698029
  //       https://nodejs.org/api/intl.html
  const addonADU = addon.average_daily_users.toLocaleString(locale);
  const addonVersion = addon.current_version.version;
  const addonLink = addon.url;
  const addonType = addon.type;
  // const addonSummary = addon.summary;
  const linebreak = '-'.repeat(addonName.length);

  const output = `
 ${addonName.bold}
 ${linebreak}
 Version: ${addonVersion.blue}
 Author(s): ${addonAuthors.blue}
 Type: ${addonType.blue}
 Daily Active Users: ${addonADU.blue}
 AMO Link: ${addonLink.blue}\n`;

  console.log(output);
};
