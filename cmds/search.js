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

  const query = args['query'] || args.q;
  const spinner = ora({spinner: firefox, text: `searching for add-ons - ${query}`}).start();

  try {
    const pageSize = args['page-size'] || args.p;
    const type = args['type'] || args.t;
    const showUrl = args['show-url'] || args.u;
    
    const queryParams = {
      url: '/addons/search',
      params: {
        'q': query,
        'app': 'firefox',
        'lang': 'en-US',
        'page_size': pageSize,
        'type': type
      }
    };

    const { count, results } = (await api(queryParams));
    const addons = results;

    spinner.stop();

    if (query)
      console.log(`${count} add-ons for "${query}":`.bold);
    else
      console.log(`${count} add-ons found:`.bold);

    addons.forEach(addon => {
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
