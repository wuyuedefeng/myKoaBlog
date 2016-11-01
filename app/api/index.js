function JoinedApi(app){
    "use strict";
    app.use(require('./v1/user.js'));
    app.use(require('./v1/posts.js'));
}

module.exports = JoinedApi;

/**
 * 10000  正确
 * 10011  未登录
 * 10050  普通未知错误
 */
