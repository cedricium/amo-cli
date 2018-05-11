const api = require('../utils/api');
const ora = require('ora');
const colors = require('colors');
const interactive = require('../utils/interactive');
const { error, FxSpinner, getLocale } = require('../utils');

module.exports = async (args) => {
  const INDENT_1 = '   ';
  const locale = getLocale();
  const spinner = ora({spinner: FxSpinner, text: 'fetching the latest featured-addons'.dim}).start();

  try {
    const pageSize = args['page-size'] || args.p;
    const type = args['type'] || args.t;
    const showUrl = args['show-url'] || args.u;
    const interactiveMode = args['interactive'] || args.i;

    const queryParams = {
      url: '/addons/featured',
      params: {
        'app': 'firefox',
        'lang': locale,
        'page_size': pageSize,
        'type': type
      }
    };

    const featuredAddons = (await api(queryParams)).results;
    spinner.stop();
    console.log('Featured add-ons'.bold);

    if (interactiveMode && featuredAddons.length !== 0) {
      interactive(featuredAddons);
    } else {
      featuredAddons.forEach(addon => {
        const addonName = addon.name || add.name[locale];
        const addonSummary = addon.summary === null
          ? ''
          : addon.summary[locale];
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
    }
  } catch (err) {
    spinner.stop();
    error(err, true);
  }
};
