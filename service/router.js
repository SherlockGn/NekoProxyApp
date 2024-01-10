const { Router, json } = require('express')

const { invoke } = require('../rpc/rpc')
const { port } = require('../config.json')

const router = Router()

const enabledCors = true

router.get('/', function(req, res, next) {
    if (port !== req.socket.address().port) {
        next()
        return
    }
    res.redirect("/public")
})

router.options('*', async (req, res, next) => {
    if (enabledCors) {
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
    if (enabledCors) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Methods', '*')
        res.header('Access-Control-Allow-Headers', '*')
    }
    const { module, func, args } = req.body
    req.context.rpc = {
        module,
        func
    }
    try {
        const result = await invoke(module, func, args)
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