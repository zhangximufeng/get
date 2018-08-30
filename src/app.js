const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/', require('./route/home'));
app.use('/get-hongbao', require('./route/get-hongbao'));
app.use('/check-cookie', require('./route/check-cookie'));

module.exports = app;
