# get

[![GPL-3.0](https://img.shields.io/badge/license-GPL--3.0-blue.svg)](LICENSE)

【注意】由于领取逻辑容易被饿了么、美团针对性更新，故 mtdhb 线上与本仓库不再同步

红包核心领取逻辑，需配合 [mtdhb/api](https://github.com/mtdhb/api) 使用

基于 [mtdhb/old](https://github.com/mtdhb/old) 改造，代码比较乱，自行研究和部署吧

## 环境

Node.js 9.x

```bash
npm i -g yarn
```

## 代理

[src/service/proxy-server.js](src/service/proxy-server.js)

## 开发

```bash
yarn
yarn dev
```

## 生产

### 首次部署

```bash
git clone https://github.com/mtdhb/get.git mtdhb-get
cd mtdhb-get
yarn global add pm2
yarn
yarn start
```

### 代码更新

```bash
git fetch origin master
git reset --hard FETCH_HEAD
yarn
yarn reload
```

可放在 webhook 中，当代码 push 到远程时自动更新

### 查看日志，内存信息等

请查看 pm2 文档 https://www.npmjs.com/package/pm2

另外在 `log/` 目录也将按照日期输出每天的日志
