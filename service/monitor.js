const { v4 } = require('uuid')

const { ApiLog } = require('../db/apiLog')
const { RestLog } = require('../db/restLog')
const { ProxyLog } = require('../db/proxyLog')

const monitor = (req, res, next) => {
    req.context = {
        start: new Date(),
        transaction: v4()
    }

    next()

    res.on('close', () => {
        const url = req.url
        const method = req.method
        const status = res.statusCode
        const duration = new Date() - req.context.start
        const transaction = req.context.transaction
        const reqLength = req.headers['content-length'] ?? 0
        const resLength = res.getHeader('content-length') ?? 0
        if (req.context.isApiPreflight || req.context.isRootPath) {
            return
        }
        if (req.context.rpc) {
            ApiLog.create({
                url,
                method,
                status,
                duration,
                transaction,
                reqLength,
                resLength,
                module: req.context.rpc.module,
                func: req.context.rpc.func,
                user: req.context.auth?.user?.name ?? null,
                authType: req.context.auth?.type ?? null
            })
        } else if (req.context.rest) {
            RestLog.create({
                url,
                method,
                status,
                duration,
                transaction,
                reqLength,
                resLength,
                type: req.context.rest.type,
                db: req.context.rest.db,
                model: req.context.rest.model
            })
        } else {
            ProxyLog.create({
                url: req.originalUrl,
                method,
                status,
                duration,
                transaction,
                reqLength,
                resLength,
                ruleId: req.context.proxy?.id ?? null,
                ruleName: req.context.proxy?.name ?? null
            })
        }
    })
}

module.exports = {
    monitor
}
