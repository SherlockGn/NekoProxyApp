const express = require('express')

const { static } = require('./static')
const { router } = require('./router')
const { rest } = require('./rest')
const { githook } = require('./githook')
const { monitor } = require('./monitor')
const { logger } = require('./log')
const config = require('../config.json')

const app = express()

app.disable('x-powered-by')
app.disable('etag')

app.use('/nekoapp/public', static)

app.use('*', monitor)

app.use(router)
app.use(rest)
app.use(githook)

const servers = []

const start = async () => {
    const server = await new Promise((resolve, reject) => {
        const s = app.listen(config.port, () => {
            resolve(s)
        })
    })
    logger.info({
        message: `Server started on http://localhost:${config.port}`,
        config,
        dir: __dirname,
        process: {
            pid: process.pid,
            ppid: process.ppid,
            platform: process.platform,
            args: process.argv
        }
    })
    servers.push(server)
}

module.exports = {
    app,
    servers,
    start
}
