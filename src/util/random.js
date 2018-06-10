module.exports = {
  int(min, max) {
    return ~~(Math.random() * (max - min + 1)) + min;
  },
  array(array) {
    return array[this.int(0, array.length - 1)];
  },
  phone(exclude) {
    const numbers = [
      // 联通
      130,
      131,
      132,
      145,
      155,
      156,
      166,
      175,
      176,
      185,
      186,
      // 移动
      134,
      135,
      136,
      137,
      138,
      139,
      147,
      150,
      151,
      152,
      157,
      158,
      159,
      178,
      182,
      183,
      184,
      187,
      188,
      198
      // 电信用户占比太少，不参与随机
    ];
    let phone;
    do {
      phone = this.array(numbers) + String(Math.random() * 10).slice(-8);
      // 别随机到了要领取的那个号
    } while (phone === exclude);
    return phone;
  }
};
