const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const rateLimiter = require('express-rate-limit');
const winston = require('winston');
const fs = require('fs');
const cors = require('cors');
require('express-async-errors')

const indexRouter = require('./routes/index');
const limiter = rateLimiter({
  statusCode: 200,
  windowMs: 60 * 60 * 1000, // Limit 1 hour
  max: 5, // for 5 request,
  message: {
    statusCode: 429,
    message: 'Request Limit Exceeded'
  }
})

const app = express();

app.use(limiter);
app.use(logger(":remote-user [:date[web]] \":method :url HTTP/:http-version\" :status :res[content-length] \":response-time[digits] ms\" \":referrer\" :res[header] :req[header]"));
app.use(cors({
  origin: process.env.TOOL_URL || 'http://tools.test'
}))

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/', indexRouter);

module.exports = app;
