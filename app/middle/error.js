var winston = require('./_winston');
function Error(app) {
    app.on('error', function(err, ctx){
        winston.logger.error('server error', err);
    });
}
module.exports = Error;