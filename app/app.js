var config = require('./config');
var koa = require('koa');

// --- begin --
var app = koa();

app.keys = config.session.keys;

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
    this.body = 'hello world';
});

app.listen(3000);