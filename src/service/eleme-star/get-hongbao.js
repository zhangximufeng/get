const querystring = require("querystring");
const logger = require("../../util/logger")("service/eleme-star");
const Request = require("./core/request");
const CookieStatus = require("../../constant/cookie-status");
const getHongbaoResponse = require("../get-hongbao-response");

module.exports = async (req, res) => {
  const { url, cookies, limit } = req.body;
  const response = getHongbaoResponse(req, res);

  // https://star.ele.me/hongbao/wpshare?caseid=627616199&sign=7ef38c8ec9f0504a0b2ad41eeee93d10
  response(1, "由于饿了么星选贡献人数太少，暂不开放领取功能");
};
