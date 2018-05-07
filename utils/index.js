const { red } = require('colors');

exports.error = (message, exit) => {
  console.error('ERROR: '.red + message);
  exit && process.exit(1);
};

exports.FxSpinner = {
  "interval": 200,
  "frames": [
    "🔥 ",
    "🦊 ",
  ]
};
