var redis = require("redis");
var winston = require('../_winston');

rdb = redis.createClient();

// 选择数据库，比如第6个数据库，默认是第0个
rdb.select(6);

//错误监听
rdb.on("error", function (err) {
    throw(err);
    winston.logger.error("Error: " + err);
});

module.exports = rdb;


