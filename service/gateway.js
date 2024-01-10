const proxy = require('express-http-proxy')

const { Rule } = require('../db/rule')
const { port } = require('../config.json');
const { logger } = require('./log');

const removeIf = (array, callback) => {
    let i = 0
    while (i < array.length) {
        if (callback(array[i], i)) {
            array.splice(i, 1)
        }
        else {
            ++i
        }
    }
}

const getFunctionByStringContent = (params, content) => {
    const string = `async (${params.join(', ')}) => {
${content}
}`
    return Function(`return ${string}`)()
}

const getProxyResolver = rule => {
    return proxy(rule.host, {
        filter: async (req, res) => {
            if (rule.port !== req.socket.address().port) {
                return false
            }
            const method = getFunctionByStringContent(['req'], rule.filter)
            const filtered = method(req)
            if (filtered) {
                req.context.proxy = rule
            }
            return filtered
        },
        proxyReqPathResolver: async (req) => {
            const method = getFunctionByStringContent(['req'], rule.path)
            return method(req)
        },
        proxyReqOptDecorator: async (req, res) => {
            const method = getFunctionByStringContent(['req'], rule.req)
            return method(req)
        },
        proxyReqBodyDecorator: async (bodyContent, srcReq) => {
            const method = getFunctionByStringContent(['body'], rule.reqBody)
            return method(bodyContent)
        },
        userResDecorator: async (proxyRes, proxyResData, userReq, userRes) => {
            const method = getFunctionByStringContent(['body'], rule.resBody)
            return method(proxyResData)
        },
        userResHeaderDecorator: async (headers, req, res) => {
            const method = getFunctionByStringContent(['headers'], rule.resHeader)
            return method(headers)
        },
        limit: rule.limit,
        parseReqBody: rule.parseReqBody,
        reqAsBuffer: rule.reqAsBuffer,
        timeout: rule.timeout,
        memoizeHost: rule.memoizeHost,
        https: rule.https
    })
}

const refreshProxies = async () => {

    const { app, servers } = require('./app')
    const { startServer, stopServer } = require('./servers')
    
    const rules = await Rule.findAll({
        where: {
            enabled: true
        },
        order: [
            ['sequence', 'ASC']
        ]
    })

    const proxies = rules.map(rule => getProxyResolver(rule.dataValues))

    removeIf(app._router.stack, item => item.name == 'handleProxy')
    proxies.forEach(proxy => app.use('*', proxy))

    logger.info(`Updated ${proxies.length} router stacks.`)

    const ports = servers.map(server => server.address().port)
    const updatePorts = rules.map(rule => rule.port)

    let portsToOpen = updatePorts.filter(p => !ports.includes(p))
    let portsToClose = ports.filter(p => !updatePorts.includes(p) && p !== port)

    portsToOpen = [... new Set(portsToOpen)]
    portsToClose = [... new Set(portsToClose)]

    logger.info({
        portsToOpen,
        portsToClose
    })

    try {

        for (const p of portsToOpen) {
            await startServer(p)
        }
    
        for (const p of portsToClose) {
            await stopServer(p)
        }

    }
    catch (ex) {
        logger.error(ex)
    }

    
}

module.exports = {
    refreshProxies
}