var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
require('./app_api/models/db');
var apiRoute=require("./app_api/routes/index");

var app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
var allowCrossDomain = function(req, res, next) { 
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
};

app.use(allowCrossDomain);
<<<<<<< HEAD

=======
app.use(express.json());
app.use(express.urlencoded({extended:false}));
>>>>>>> e4cd6635d4be8f5250f7a9c9056f494946d4af22
app.use("/api",apiRoute);

app.use('/users', usersRouter);

module.exports = app;
