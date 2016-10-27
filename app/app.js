var config = require('./config');
var koa = require('koa');
// 日志
var winston = require('winston');

// --- begin --
var app = koa();
/**
 * logger x-response-time
 * 放在所有中间件之前执行
 */
require('./middle/logger')(app);
/**
 * 错误处理
 */
require('./middle/error')(app);

app.use(function *(){
    this.body = 'Hello World';
});

app.listen(3000);