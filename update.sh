#!/bin/bash

cp src/service/eleme/core/mobile-list.json src/service/eleme/core/mobile-list.json.bak
git fetch origin master
git reset --hard FETCH_HEAD
cp src/service/eleme/core/mobile-list.json.bak src/service/eleme/core/mobile-list.json
npm i
npm run reload
pm2 ls
