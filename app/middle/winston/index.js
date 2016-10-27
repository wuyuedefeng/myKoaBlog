var winston = require('winston');
var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            colorize: true, //控制台日志输出带颜色
            level: 'debug' //{ error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
        }),
        new (winston.transports.File)({
            filename: 'logs/app.log',  // 日志文件路径
            level: 'info'
        })
    ]
});
exports.logger = logger;