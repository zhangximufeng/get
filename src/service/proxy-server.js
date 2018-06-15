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

// 为了代码中不暴露IP，在环境变量中配置代理列表 PROXY_LIST=ip1:port1|ip2:port2|...
const server = (process.env.PROXY_LIST || '').split('|').map(proxy => {
  const [host, port] = proxy.split(':');
  return {host, port};
});

module.exports = () => {
  const proxy = Random.array(server);
  logger.log('%j', proxy || '本次不走代理');
  return proxy;
};
