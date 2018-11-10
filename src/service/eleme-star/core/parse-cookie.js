const Cookie = require('cookie');

module.exports = cookie => {
  try {
    return Cookie.parse(cookie);
  } catch (e) {
    return null;
  }
};
