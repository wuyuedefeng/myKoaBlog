var config = require('./config');
var koa = require('koa');
var bodyParser = require('koa-bodyparser');
var staticServe = require('koa-static');
// 加载models 链接mongo
require('./models');

// --- begin --
var app = koa();

app.keys = config.session.keys;

/**
 * 静态文件
 */
app.use(staticServe(__dirname + '/public/js/lib', {
    maxage: 60 * 60 * 1000
}));
app.use(staticServe(__dirname + '/public'));

/**
 * logger x-response-time
 * 放在所有中间件之前执行
 */
require('./middle/logger')(app);

/**
 * 处理post参数到app(this.request.body)中
 */
app.use(bodyParser());

/**
 * 错误处理
 */
require('./middle/error')(app);

/**
 * session
 */
require('./middle/session')(app);

/**
 * Api
 */
require('./api')(app);
require('./routes')(app);


// app.use(function *(){
//     this.body = 'abc';
// });

app.listen(config.port);