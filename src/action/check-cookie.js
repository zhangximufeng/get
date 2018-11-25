const logger = require("../util/logger")("request/check-cookie");
const cleanCookie = require("../service/clean-cookie");
const eleme = require("../service/eleme/check-cookie");
const meituan = require("../service/meituan/check-cookie");
const elemeStar = require("../service/eleme-star/check-cookie");

module.exports = async (req, res, next) => {
  const { application, cookie } = req.body;
  logger.info(req.body);
  req.body.cookie = cleanCookie(cookie);
  const action = [meituan, eleme, elemeStar][application];
  if (!action) {
    return res.json({ code: -1, message: "application 不合法" });
  }
  await action(req, res);
};
