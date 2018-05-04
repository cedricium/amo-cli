const api = require('../utils/api');
const ora = require('ora');
const colors = require('colors');

const firefox = {
  "interval": 200,
  "frames": [
    "🔥 ",
    "🦊 ",
  ]
};

module.exports = async (args) => {
  const INDENT_1 = '   ';

  const spinner = ora({spinner: firefox, text: 'fetching the latest featured-addons'}).start();

  try {
    const language = args['language'] || args.l;
    const pageSize = args['page-size'] || args.p;
    const type = args['type'] || args.t;
    const showUrl = args['show-url'] || args.u;
    
    const queryParams = {
      url: '/addons/featured',
      params: {
        'app': 'firefox',
        'lang': language,
        'page_size': pageSize,
        'type': type
      }
    };

    const featuredAddons = (await api(queryParams)).results;
    spinner.stop();
    console.log('Featured add-ons:'.bold);
    featuredAddons.forEach(addon => {
      const addonName = addon.name['en-US'] || addon.name['en-GB'] || addon.name;
      const addonSummary = addon.summary === null
        ? ''
        : addon.summary['en-US'] || addon.summary['en-GB'];
      const addonLink = addon.url;

      let consoleOutput = '';
      
      if (!showUrl) {
        consoleOutput += `· ${addonName}`;
        console.log(consoleOutput);
      } else {
        consoleOutput += `· ${addonName}\n${INDENT_1}${addonLink.blue}`;
        console.log(consoleOutput);
      }
    });
  } catch (err) {
    spinner.stop();
    console.error(err);
  }
};
