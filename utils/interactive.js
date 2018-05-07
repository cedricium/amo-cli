const colors = require('colors');
const inquirer = require('inquirer');

module.exports = (args) => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'addonSelection',
      message: 'Which add-on would you like to explore:',
      choices: args,
      pageSize: 115
    }
  ])
  .then(answers => {
    selectedAddon = filterValue(args, 'name', answers.addonSelection);
    showAddonDetails(selectedAddon);
  });
};

const filterValue = (obj, key, value) => obj.find(v => v[key] === value);

const showAddonDetails = addon => {
  const addonName = addon.name;
  const addonAuthors = addon.authors[0].name;
  const addonADU = addon.average_daily_users.toString();
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