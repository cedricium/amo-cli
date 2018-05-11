const axios = require('axios');

module.exports = async (args) => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  // addons-server API request config
  // refs: http://addons-server.readthedocs.io/en/latest/topics/api/index.html
  const requestConfig = {
    headers: {'Content-Type': 'application/json'},
    baseURL: 'https://addons.mozilla.org/api/v3/',
    method: 'get',
    url: args.url,
    params: args.params,
  };

  const results = await axios(requestConfig);
  return results.data;
};
