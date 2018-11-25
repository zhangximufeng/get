const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const wrap = require("./wrap");

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", wrap.action(require("./action/home")));
app.post("/get-hongbao", wrap.action(require("./action/get-hongbao")));
app.post("/check-cookie", wrap.action(require("./action/check-cookie")));
app.use(wrap.error);

const port = process.env.PORT || 3333;
app.listen(port);
console.log(`Listening on http://127.0.0.1:${port}`);
