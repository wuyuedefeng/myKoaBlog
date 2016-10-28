var staticServe = require('koa-static');

function joinedStatic(app){
    "use strict";
    if (!app) throw new Error('必须传入app参数');
    // 静态文件目录
    app.use(staticServe('./css'));
    app.use(staticServe('./js'));
    app.use(staticServe('./views'));
    app.use(staticServe('./img'));
    console.log('abcdefg...');
}
module.exports = joinedStatic;