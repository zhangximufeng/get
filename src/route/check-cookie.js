const express = require('express');
const _ = require('lodash');
const router = express.Router();
const logger = require('../util/logger')('request/check-cookie');
const cleanCookie = require('../service/clean-cookie');
const eleme = require('../service/eleme/check-cookie');
const meituan = require('../service/meituan/check-cookie');

router.post('/', async (req, res, next) => {
  try {
    const {application, cookie} = req.body;
    logger.info('%j', req.body);
    req.body.cookie = cleanCookie(cookie);
    const action = [meituan, eleme][application];
    if (!action) {
      return res.json({code: -1, message: 'application 不合法'});
    }
    await action(req, res);
  } catch (e) {
    logger.error(e);
    res.json({code: -2, message: _.get(e, 'response.data.message', '网络繁忙，请稍后重试')});
  }
});

module.exports = router;
