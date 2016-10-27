var config = require('./config');
var koa = require('koa');
// 日志
var winston = require('winston');

// --- begin --
var app = koa();
/**
 * logger
 * 放在所有中间件之前执行
 */
require('./middle/logger.js')(app);



app.use(function *(){
    this.body = 'Hello World';
});

app.listen(3000);