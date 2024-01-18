const { logger } = require('./log')
const { app, servers } = require('./app')

const startServer = async port => {
    const server = await new Promise((resolve, reject) => {
        let server = null
        server = app.listen(port)
        server.on('listening', () => {
            logger.info(`Proxy server (${port}) started successfully.`)
            resolve(server)
        })
        server.on('error', e => {
            logger.error(`Proxy server (${port}) failed to start.`)
            reject(e)
        })
    })
    servers.push(server)
}

const stopServer = async port => {
    const index = servers.findIndex(s => s.address().port === port)
    if (index >= 0) {
        const server = servers[index]
        await new Promise((resolve, reject) => {
            server.close(() => {
                servers.splice(index, 1)
                logger.info(`Proxy server (${port}) closed successfully.`)
                resolve()
            })
        })
    }
}

module.exports = {
    startServer,
    stopServer
}
