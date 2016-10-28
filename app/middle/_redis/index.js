var rdb = require('./redis');
var config = {

};

var getUserByUid = function (uid, cb){
    "use strict";
    rdb.hgetall('session:user:' + uid, function(err, user){
        if (user){
            user.uid = uid;
        }
        cb(err, user);
    });
};

var getUserByUname = function(uname, cb){
    "use strict";
    getUidByUname(uname, function(err, uid){
        if (err) return cb(err);
        getUserByUid(uid, cb);
    });
};

function getUidByUname(uname, cb){
    rdb.get('session:uid:' + uname, function(err, uid){
        cb(err, uid);
    });
}

var save = function(user, cb){
    "use strict";
    // 这里可以自定义uname, 提供修改接口
    var unameShadow = config.unameShadow;
    var uname = user[unameShadow];
    user.uname = uname;
    if (!uname){
        return cb(new Error('uname映射字段' + config.unameShadow +'不在对象中, 如果需要映射其他字段请调用本mudule的config方法进行设置unameShadow的值'));
    }

    getUidByUname(uname, function(err, uid){
        if (err) return cb(err);
        if (uid){
            // 若想多点登录，直接使用原来的uid
            //user.uid = uid;
            //更新用户信息（可选）
            //update(user, cb);

            // 若想单点登录,先删除已有用户,创建新的reids_id(uid)即可
            // 删除原来的用户创建新的,保证每次save只保留一个新创建的用户
            rdb.del('session:uid:' + user.uname, function(err){
                if (err) return cb(err);
                rdb.del('session:user:' + uid, function(err){
                    if (err) return cb(err);
                    createNew(user, cb);
                });
            });

        }else {
            createNew(user, cb);
        }
    });
};

function createNew(user, cb){
    "use strict";
    rdb.incr('session:ids', function(err, uid){
        if (err) return cb(err);
        user.uid = uid;
        update(user, cb);
    });
}

function update(user, cb){
    var uid = user.uid;
    var uname = user.uname;
    rdb.set('session:uid:' + user.uname, uid, function(err){
        if (err) return cb(err);
        // delete user.uid;
        // delete user.uname;
        for(var key in user){
            if (config.redisSaveUserKeys.indexOf(key) == -1){
                delete user[key];
            }
        }
        rdb.hmset('session:user:' + uid, user, function(err){
            user.uid = uid;
            user.uname = uname;
            cb(err, user);
        });
    });
}

function configOpt(opt){
    opt = opt || {};
    "use strict";
    // 默认映射username字段作为uname的值(即可以通过username查询到user通过:getUserByUid)
    config.unameShadow = opt.unameShadow || 'username';
    config.redisSaveUserKeys = opt.redisSaveUserKeys || ['username'];
}
configOpt();
exports.config = configOpt;
exports.save = save;
exports.getUserByUid = getUserByUid;
exports.getUserByUname = getUserByUname;