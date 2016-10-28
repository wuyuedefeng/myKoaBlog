var config = require('./config');
var https = require('https');
var qs = require('querystring');
var router = require('koa-router')({
    prefix: '/github'
});
var User = require('../../models/user');


function get_access_token(code, cb){
    var data = qs.stringify({
        client_id: config.oauth_client_id,
        client_secret: config.oauth_client_secret,
        code: code
    });

    var get_access_token_config = config.get_access_token_config;
    var reqOptions = {
        host: get_access_token_config.oauth_host,
        port: get_access_token_config.oauth_port,
        path: get_access_token_config.oauth_path,
        method: get_access_token_config.oauth_method,
        headers: {'Content-Length': data.length}
    };

    var body = "";
    var req = https.request(reqOptions, function(res){
        res.setEncoding('utf8');
        res.on('data', function(chunk){
            body += chunk;
        });

        res.on('end', function(){
            cb(null, qs.parse(body).access_token);
        });
    });
    req.write(data);
    req.end();

    req.on('error', function(err){
        cb(err.message);
    });
}


function get_userInfo(accessToken, cb){
    var options = {
        hostname: 'api.github.com',
        port: 443,
        path: '/user',
        method: 'GET',
        headers: {
            'Authorization': 'token ' + accessToken,
            'User-Agent': 'node-china.club'
        }
    };
    var req = https.request(options, function(res){
        var body = "";
        res.setEncoding('utf8');
        res.on('data', function(chunk){
            body += chunk;
        });

        res.on('end', function(){
            cb(null, JSON.parse(body));
        }).on("error", function (err) {
            cb(err.message);
        });
    });
    req.write(qs.stringify({access_token: accessToken}));
    req.end();

    req.on('error', function(err){
        cb(err.message);
    });
}


//router.all('/github/*', function(req, res, next){
//    res.header('Access-Control-Allow-Origin', '*');
//    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
//    res.header('Access-Control-Allow-Headers', 'Content-Type');
//    next();
//});

/*
 访问: https://github.com/login/oauth/authorize?scope=user:email&client_id=<%= config.oauth_client_id %>
 点击授权后,跳转到该路由,并带有token值和state值(state值就是url传的值,可随便填写)
 返回code
 */
router.get('/authCallback', function *(next){
    // 通过authCallback 返回的code, 去获取access_token
    var self = this;
    console.log(self.query);
    yield new Promise((resolve, reject) =>{
        get_access_token(self.query.code, function(err, access_token){
            if(err) reject(err);
            // 通过access_token获取用户信息
            get_userInfo(access_token, function(err, githubUser){
                if (err) reject(err);
                User.login(githubUser, function(err, user){
                    if (err) reject(err);
                    resolve(user);
                });
            });
        })
    }).then(function (user) {
        self.cookies.set("uid", user.redis_id, {signed: true});
        self.redirect('/');
    });
});

// 退出登录
// router.get('/logout', function(req, res, next){
//     req.session = null;
//     res.redirect('back');
// });

module.exports = router.routes();