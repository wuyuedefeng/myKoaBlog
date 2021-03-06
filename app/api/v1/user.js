var githubConfig = require('../../middle/_github/config');
var router = require('koa-router')({
    prefix: '/api/v1/user'
});

router.get('/githubClientId', function *() {
    this.body = {
        code: 10000,
        oauthClientId: githubConfig["oauth_client_id"]
    }
});

// router.post('/login', function *(){
//     "use strict";
//     var params = this.request.body;
//     var self = this;
//     var access = yield http.post('/v1/login', {
//         login_type: 'user',
//         login: params.username,
//         password: params.password
//     });
//     var info = yield http.get('/v1/account_info', {
//         login_type: 'user',
//         access_token: access.access_token
//     });
//     var userInfo = info.data;
//     console.log(self.currentUser);
//     var customInfo = {
//         access_token: access.access_token,
//         id: userInfo.id,
//         name: userInfo.name,
//         phone: userInfo.phone,
//         email: userInfo.email,
//         role: userInfo.role,
//         realname: userInfo.realname
//     };
//     yield new Promise((resolve, reject) => {
//         session.save(customInfo, function(err, user){
//             if (err){
//                 self.body = {success: false};
//                 reject(err);
//             }
//             resolve(user);
//         });
//     }).then(function(user){
//         self.cookies.set("uid", user.uid, {signed: true});
//         self.body = {success: true, user: user};
//     });
//
// });

router.post('/logout', function *(){
    "use strict";
    this.cookies.set("uid", null, {signed: true});
    this.body = {code: 10000};
});

// 个人信息
router.get('/info', function *(){
    "use strict";
    var user = this.currentUser;
    if (user){
        delete  user.uid;
        this.body = {code: 10000, user: user};
    }else {
        this.body = {code: 10011, msg: '未登陆'};
    }
});

module.exports = router.routes();