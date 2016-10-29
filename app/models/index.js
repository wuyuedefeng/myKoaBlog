var config = require('../config');
var winston = require('../middle/_winston');
// 启动mongo
var mongoose = require('mongoose');

var User = require('./user');
var Subject = require('./subject');
var Post = require('./post');
exports.User    = User;
exports.Post    = Post;
exports.Subject = Subject;

mongoose.Promise = global.Promise;
mongoose.connect(config.db, function(err){
    if (err) {
        // console.log(err.message);
        winston.logger.error(err.message);
        process.exit(1);
    }else {
        console.info('link MongoDB success!!!');
        var Subject = require('./subject.js');
        console.log(Subject.initData());

    }
});

