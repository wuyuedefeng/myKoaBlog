var _models = require('../../models');
var router = require('koa-router')({
    prefix: '/api/v1/posts'
});

// 获取帖子列表
router.get('/', function *() {
    "use strict";
    var self = this;
    var keywords = self.query.keywords;

    self.body = {
        code: 10000,
        posts: [1,2,3]
    }

});


// 发布帖子
router.post('/new', function *(next) {
    var self = this;
    var post = this.body;
    post.userId = post["mongo_id"];
    console.log(post);

   // yield new Promise((resolve, reject) => {
   //     _models.Post.insertPost(post, function(err, post){
   //         if (err) {
   //             reject(err);
   //         }else {
   //             resolve(post);
   //         }
   //
   //     });
   // }).then(function (post) {
   //     self.body = {
   //         code: 10000,
   //         post: post
   //     }
   // }, function () {
   //     self.body = {
   //         code: 10050,
   //         msg: '保存失败'
   //     }
   // });



});



module.exports = router.routes();