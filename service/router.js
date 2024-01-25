const { Router, json } = require('express')

const { invoke } = require('../rpc/rpc')
const { port, enableCORS } = require('../config.json')
const { required } = require('../config.json').login
const { check } = require('./user')

const router = Router()

router.get('/', function (req, res, next) {
    if (port !== req.socket.address().port) {
        next()
        return
    }
    req.context.isRootPath = true
    res.redirect('/nekoapp/public')
})

router.options('*', async (req, res, next) => {
    if (enableCORS) {
        req.context.isApiPreflight = true
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Methods', '*')
        res.header('Access-Control-Allow-Headers', '*')
        res.sendStatus(200)
    } else {
        next()
    }
})

router.post('/api/rpc', async (req, res, next) => {
    if (port !== req.socket.address().port) {
        next()
        return
    }
    await new Promise((resolve, reject) => {
        json()(req, res, resolve)
    })
    if (enableCORS) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Methods', '*')
        res.header('Access-Control-Allow-Headers', '*')
    }
    const { module, func, args } = req.body
    req.context.rpc = {
        module,
        func
    }
    if (required) {
        try {
            const auth = await check(req.headers.authorization)
            req.context.auth = auth
        } catch (error) {
            console.error(error)
            res.status(401).send()
            return
        }
    }
    try {
        const result = await invoke(module, func, args, req.context)
        if (result == undefined) {
            res.status(204).send()
        } else {
            res.json(result)
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error.message })
    }
})

module.exports = {
    router
}
