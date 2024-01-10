const log4js = require('log4js')

const { SystemLog } = require('../db/systemLog')

log4js.configure({
    appenders: {
        file: {
            type: 'datefile',
            filename: 'runtime/log/gateway.log'
        },
        console: {
            type: 'console'
        }
    },
    categories: {
        default: {
            appenders: ['file', 'console'],
            level: 'trace'
        }
    }
})

const logger = log4js.getLogger()

const customLogger = {}
;['trace', 'debug', 'info', 'warn', 'error', 'fatal'].forEach(level => {
    customLogger[level] = msg => {
        let type = typeof msg
        if (type !== 'string') {
            msg = JSON.stringify(msg)
            type = 'object'
        }

        logger[level].call(logger, msg)

        SystemLog.create({
            level,
            type,
            content: msg
        })
    }
})

module.exports = {
    logger: customLogger
}