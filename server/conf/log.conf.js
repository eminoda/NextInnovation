module.exports = {
    appenders: {
        out: {
            type: 'stdout'
        },
        bussDate: {
            type: 'dateFile',
            filename: 'log/buss.log'
        },
        accessDate: {
            type: 'dateFile',
            filename: 'log/access.log'
        },
        globalError: {
            type: 'dateFile',
            filename: 'log/error.log'
        },
        error: {
            type: 'logLevelFilter',
            appender: 'globalError',
            level: 'error'
        }
    },
    categories: {
        // 默认输出
        default: {
            appenders: ['out', 'bussDate', 'error'],
            level: 'debug'
        },
        // 访问输出
        access: {
            appenders: ['out', 'accessDate', 'error'],
            level: 'debug'
        }
    }
}