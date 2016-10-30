var router = require('koa-router')({
    prefix: '/api/v1/posts'
});

router.get('/', function *() {
    "use strict";
    var self = this;

    self.body = {
        code: 10000,
        posts: [1,2,3]
    }

});



module.exports = router.routes();