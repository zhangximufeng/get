const fs = require('fs');
const path = require('path');
const {white = [], black = []} = require('./mobile-list.json');

// 定时存一下
setInterval(() => {
  fs.writeFile(path.join(__dirname, 'mobile-list.json'), JSON.stringify({white, black}), () => {});
}, 1000 * 10);

module.exports = {
  // 加入白名单，用于以后快速随机
  addWhite(value) {
    if (!white.includes(value)) {
      white.push(value);
    }
  },
  // 加入黑名单，以后随机不用它
  addBlack(value) {
    if (!black.includes(value)) {
      black.push(value);
    }
  }
};
