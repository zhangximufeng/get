const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  res.send("mtdhb/get 服务启动成功");
});

module.exports = router;
