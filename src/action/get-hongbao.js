const logger = require("../util/logger")("request/get-hongbao");
const eleme = require("../service/eleme/get-hongbao");
const meituan = require("../service/meituan/get-hongbao");
const elemeStar = require("../service/eleme-star/get-hongbao");

module.exports = async (req, res, next) => {
  const { application, cookies } = req.body;
  if (typeof cookies === "string") {
    req.body.cookies = JSON.parse(cookies);
  }
  logger.info(req.body);
  const action = [meituan, eleme, elemeStar][application];
  if (!action) {
    return res.json({ code: -1, message: "application 不合法" });
  }
  await action(req, res);
};
