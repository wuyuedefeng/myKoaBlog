var session = require('./_redis');
function Session(app){
    "use strict";
    app.use(function *(next){
        var uid = this.cookies.get("uid", {signed: true});
        var self = this;
        if (uid){
            yield new Promise((resolve, reject) => {
                session.getUserByUid(uid, function(err, user){
                    if (err){
                        self.body = {success: false};
                        reject(err);
                    }
                    resolve(user);
                });
            }).then(function(user){
                self.currentUser = user;
            });
        }else {
            self.currentUser = null;
        }
        yield next;
    });
}

module.exports = Session;