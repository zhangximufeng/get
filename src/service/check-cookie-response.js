const logger = require('../util/logger')('response/check-cookie');

module.exports = (req, res) => (code, message, data) => {
  if (code === 0) {
    data = {
      openid: data.openid || data.openId || '',
      headimgurl: data.headimgurl || data.avatar || data.imgUrl || '',
      nickname: data.nickname || '',
      service: data.service
    };
    Object.keys(data).forEach(key => {
      if (typeof data[key] === 'string') {
        data[key] = data[key].trim();
      }
    });
  }
  const r = {
    code,
    message,
    data
  };
  res.json(r);
  logger.info(r);
};
