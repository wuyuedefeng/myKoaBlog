if (process.env.NODE_ENV == 'production'){
    module.exports = require('./config.production');
}else {
    module.exports = require('./config');
}