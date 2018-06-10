const Random = require('../util/random');
const logger = require('../util/logger')('service/proxy');

// 可以设置多个代理服务器, 也可以改为 [null] 表示不走代理
// 对象格式
// {
//  host,
//  port,
//  auth: {
//    username,
//    password
//  }
// }
// const server = [null];
const server = [{host: process.env.PROXY_HOST, port: process.env.PROXY_PORT}];

module.exports = () => {
  const proxy = Random.array(server);
  logger.log('%j', proxy || '本次不走代理');
  return proxy;
};
