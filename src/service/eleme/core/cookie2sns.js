const logger = require('../../../util/logger')('service/eleme');
const cleanCookie = require('../../clean-cookie');
const HttpService = require('../../../constant/http-service');

module.exports = cookie => {
  try {
    const target = cleanCookie(cookie)
      .split(/;\s*/)
      .find(item => /^snsInfo\[/.test(item));
    if (target) {
      let str = decodeURIComponent(target.split('=')[1]);
      if (str[str.length - 1] === '"') {
        str = str.slice(0, -1);
      }
      const sns = JSON.parse(str);
      if (sns.eleme_key && sns.openid) {
        // 怕有人搞个空格上来，骗过重复
        sns.eleme_key = String(sns.eleme_key).trim();
        sns.openid = String(sns.openid).trim();
        if (target.indexOf('snsInfo[wx2a416286e96100ed]=') === 0) {
          sns.service = HttpService.WEIXIN;
        } else if (target.indexOf('snsInfo[101204453]=') === 0) {
          sns.service = HttpService.QQ;
        } else {
          logger.error('非饿了么授权 cookie');
          return null;
        }
        return sns;
      }
    }
  } catch (e) {
    logger.error(e.message);
  }
  return null;
};
