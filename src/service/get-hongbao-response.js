const logger = require('../util/logger')('response/get-hongbao');

module.exports = (req, res) => (code, message, result) => {
  const r = {
    code,
    data: {
      cookies: req.body.cookies.filter(({status}) => !isNaN(status)).map(({id, status}) => ({id, status}))
    },
    message
  };
  if (result) {
    r.data.result = result;
  }
  res.json(r);
  logger.info('%j', r);
};
