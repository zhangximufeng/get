const Cookie = require('cookie');
const logger = require('../../../util/logger')('service/eleme');
const cleanCookie = require('../../clean-cookie');
const HttpService = require('../../../constant/http-service');

module.exports = cookie => {
  try {
    const cookies = Cookie.parse(cleanCookie(cookie));
    const qqCookie = cookies['snsInfo[101204453]'];
    const wxCookie = cookies['snsInfo[wx2a416286e96100ed]'];
    const snsInfo = JSON.parse(decodeURIComponent(qqCookie || wxCookie));
    snsInfo.sign = snsInfo.eleme_key;
    let service = 0;
    if (qqCookie) {
      service = HttpService.QQ;
    } else if (wxCookie) {
      service = HttpService.WEIXIN;
    } else {
      logger.error('非饿了么授权 cookie');
      return null;
    }
    return {
      ...snsInfo,
      sid: cookies.SID,
      service
    };
  } catch (e) {
    logger.error(e.message);
  }
  return null;
};
