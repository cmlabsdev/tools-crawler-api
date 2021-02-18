const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
require('express-async-errors')

const mainRouter = require('./routes/index');

const app = express();
app.use(logger(":remote-user [:date[web]] \":method :url HTTP/:http-version\" :status :res[content-length] \":response-time[digits] ms\" \":referrer\" :res[header] :req[header]"));
app.use(cors({
  origin: process.env.TOOL_URL || 'http://tools.test'
}))

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/', mainRouter);

module.exports = app;
