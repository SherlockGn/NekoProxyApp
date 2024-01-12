const { Router, json } = require('express')

const { port } = require('../config.json')
const { logger } = require('./log')
const { pullProjectAuto } = require('./project')

const router = Router()

router.post('/api/cicd/hook', async (req, res, next) => {
    if (port !== req.socket.address().port) {
        next()
        return
    }
    await new Promise((resolve, reject) => {
        json()(req, res, resolve)
    })
    
    logger.info({
        type: 'githook',
        headers: req.headers,
        body: req.body
    })

    let server = '', gitName = ''
    if (!!req.headers["x-gitee-event"]) {
        server = 'gitee'
        gitName = req.body.project.name
    }
    if (!!req.headers["x-github-event"]) {
        server = 'github'
        gitName = req.body.repository.name
    }

    await pullProjectAuto(server, gitName)
    res.json({
        success: true
    })
})

module.exports = {
    githook: router
}