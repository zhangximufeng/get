const Request = require('./core/request');
const {decrypto} = require('./core/crypto');
const parseUrl = require('./core/parse-url');
const Random = require('../../util/random');
const logger = require('../../util/logger')('service/meituan');
const checkCookieResponse = require('../check-cookie-response');
const cleanCookie = require('../clean-cookie');
const HttpService = require('../../constant/http-service');

module.exports = async (req, res) => {
  const {cookie} = req.body;
  const response = checkCookieResponse(req, res);
  return response(
    1,
    '5/13 23:00 非常遗憾并抱歉地通知大家：由于美团搞事情，导致大家贡献的微信 cookie 大量失效了，我们会陆续清理掉失效的小号。请转投饿了么阵营，贡献 QQ 小号。没有被清理的暂时还可以用，主要由本站早期用户持有，绝版小号！'
  );

  if (!/ewxshinfo/.test(cookie) || !/ewxinfo/.test(cookie)) {
    return response(4, 'cookie 不正确，请确保内容同时包含：\n\newxshinfo 和 ewxinfo');
  }

  const url =
    'https://activity.waimai.meituan.com/coupon/sharechannel/B2EA8E1ABA8B47EA82DB475BA17B517D?urlKey=112B0BC655BD4F0F89D27C7CBC9C9627&state=123';
  const params = parseUrl(url);
  const request = new Request();
  const data = await request.shareChannelRedirect(params);

  (async function grabShareCoupon() {
    try {
      const gsc = await request.getShareCoupon({
        url,
        cookie,
        phone: Random.phone(),
        channelUrlKey: data.channelUrlKey,
        urlKey: params.urlKey,
        dparam: data.dparam
      });

      logger.info(gsc.code, gsc.msg);

      if ([1, 4000, 7003].includes(gsc.code)) {
        const ewxinfo = checkWxinfo();
        if (!ewxinfo || !ewxinfo.openId) {
          return response(1, 'cookie 不正确，请按照教程一步一步获取');
        }
        return response(0, 'cookie 验证通过', {
          ...ewxinfo,
          service: HttpService.WEIXIN
        });
      }

      if (gsc.code === 7006) {
        return response(2, '请换一个不领美团红包的小号来贡献');
      }

      if (gsc.code === 4001) {
        // 内置的 url 可能过期了
        return response(3, '内部错误，请联系管理员修复');
      }

      if (gsc.code === 4201) {
        return grabShareCoupon();
      }
    } catch (e) {}

    response(4, 'cookie 不正确 或 网络繁忙');
  })();

  function getCookie(reg) {
    try {
      return cleanCookie(
        cookie
          .split(/;\s*/)
          .find(item => reg.test(item))
          .split('=')[1]
      );
    } catch (e) {}
    return '';
  }

  function checkWxinfo() {
    try {
      const ewxinfo = getCookie(/^ewxinfo/);
      // const ewxshinfo = getCookie(/^ewxshinfo/)
      // return ewxshinfo.slice(0, 32) === ewxinfo.slice(0, 32) ? result : null
      return JSON.parse(decrypto(ewxinfo));
    } catch (e) {}
    return null;
  }
};
