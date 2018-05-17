const config = require('config');
const {red} = require('colors'); // eslint-disable-line no-unused-vars

exports.error = (message, exit) => {
  console.error(`amo ERR:`.padEnd(10).red + message);
  exit && process.exit(1);
};

exports.FxSpinner = {
  'interval': 200,
  'frames': [
    '🔥 ',
    '🦊 ',
  ],
};

exports.getLocale = () => {
  // Fallback to 'en-US' in the case that `locale` never gets set somehow
  return config.get('locale') || 'en-US';
};

exports.countries = [
  'ar',
  'bg',
  'bn-BD',
  'ca',
  'cs',
  'da',
  'de',
  'el',
  'en',
  'en-GB',
  'en-US',
  'es',
  'eu',
  'fa',
  'fi',
  'fr',
  'fy-NL',
  'he',
  'hu',
  'id',
  'it',
  'ja',
  'ko',
  'nl',
  'pl',
  'pt',
  'pt-BR',
  'pt-PT',
  'ro',
  'ru',
  'sk',
  'sl',
  'sq',
  'sv-SE',
  'tr',
  'uk',
  'vi',
  'zh',
  'zh-CN',
  'zh-TW',
];
