var winston = require('./_winston');
// x-response-time and logger
function Logger(app){
    "use strict";
    app.use(function *(next){
        this.logger = winston.logger;// 绑定到this上

        var start = new Date;
        yield next;
        var ms = new Date - start;

        this.set('X-Response-Time', ms + 'ms');
        this.logger.info('%s %s - %sms', this.method, this.url, ms);
    });
}

module.exports = Logger;