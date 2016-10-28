function joinedRoute(app){
    "use strict";
    if (!app) throw new Error('必须传入app参数');
    app.use(require('../middle/_github'));
}
module.exports = joinedRoute;