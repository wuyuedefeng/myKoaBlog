function JoinedApi(app){
    "use strict";
    app.use(require('./v1/user.js'));
}

module.exports = JoinedApi;
