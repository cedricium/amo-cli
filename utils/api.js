const axios = require('axios');

module.exports = async (args) => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  const requestConfig = {
    headers: {'Content-Type': 'application/json'},
    baseURL: 'https://addons.mozilla.org/api/v3/',
    method: 'get',
    url: args.url,         // ie.e. '/addons/featured,
    params: args.params,   // i.e. 'app=firefox'
  };

  const results = await axios(requestConfig);
  return results.data;
};
