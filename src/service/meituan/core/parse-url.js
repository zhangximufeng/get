const querystring = require('querystring');

module.exports = url => ({
  ...querystring.parse(url.split('?').pop()),
  channelUrlKey: url.match(/\/(?:sharechannelredirect|sharechannel)\/(.*?)\?/).pop()
});
