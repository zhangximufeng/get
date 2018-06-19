const fs = require('fs');
const path = require('path');
const uniq = require('lodash/uniq');
const Random = require('../../../util/random');
let {white = [], black = []} = require('./mobile-list.json');
// 为了收集时的效率，没有判断重复。在下次读取的时候去重一下
white = uniq(white);
black = uniq(black);

// 定时存一下
setInterval(() => {
  fs.writeFile(path.join(__dirname, 'mobile-list.json'), JSON.stringify({white, black}), () => {});
}, 1000 * 10);

module.exports = {
  // 加入白名单，用于以后快速随机
  addWhite(value) {
    white.push(value);
  },
  // 加入黑名单，以后随机不用它
  addBlack(value) {
    black.push(value);
  },
  // TODO: 随机一个可用的手机号码，暂时没用上，先收集足够的量
  getWhite(exclude) {
    let value;
    do {
      value = Random.array(white);
    } while (value === exclude);
    return value;
  }
};
