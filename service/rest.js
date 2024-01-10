const { Router, json } = require('express')

const { port } = require('../config.json')
const { Model } = require('../db/model')
const { Rest } = require('../db/rest')
const { queryData, createData, updateData, deleteData } = require('./datacenter')

const router = Router()

const enabledCors = true

const checkPermission = async (req, res, type) => {
    const token = req.headers.authorization
    req.context.rest = {
        type
    }
    if (!token) {
        res.sendStatus(401)
        return null
    }
    const { db, model } = req.params
    const mod = await Model.findOne({
        where: {
            name: model,
            dbName: db
        }
    })
    if (!mod) {
        res.sendStatus(403)
        return null
    }
    req.context.rest.db = db
    req.context.rest.model = model
    const rest = (await Rest.findOne({
        where: {
            modelId: mod.id,
            token
        }
    })).dataValues
    if (!rest || !rest[type]) {
        res.sendStatus(403)
        return null
    }
    return rest
}

router.all('/api/datacenter/:db/:model/:suffix?', async (req, res, next) => {
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

    try {
        let rest = null
    
        if (req.method === 'GET' && req.params.suffix === undefined) {
            // query
            if ((rest = await checkPermission(req, res, 'query')) === null) {
                return
            }
            res.json(await queryData(rest.modelId, req.query))
            return
        }
    
        if (req.method === 'GET' && req.params.suffix !== undefined) {
            // query by pk
            if ((rest = await checkPermission(req, res, 'queryByPk')) === null) {
                return
            }
            const queried = await queryData(rest.modelId, {
                id: req.params.suffix
            })
            if (queried.length === 0) {
                res.send(404)
            } else {
                res.json(queried[0])
            }
            return
        }
    
        if (req.method === 'POST' && req.params.suffix === '$query') {
            // advanced query
            if ((rest = await checkPermission(req, res, 'advancedQuery')) === null) {
                return
            }
            const { where, offset, limit, order } = req.body
            res.json(await queryData(rest.modelId, where, offset, limit, order))
            return
        }
    
        if (req.method === 'POST' && req.params.suffix === undefined) {
            // create
            if ((rest = await checkPermission(req, res, 'create')) === null) {
                return
            }
            res.json(await createData(rest.modelId, req.body))
            return
        }
    
        if (req.method === 'PUT' && req.params.suffix === undefined) {
            // update
            if ((rest = await checkPermission(req, res, 'update')) === null) {
                return
            }
            res.json(await updateData(rest.modelId, req.body))
            return
        }
    
        if (req.method === 'DELETE' && req.params.suffix !== undefined) {
            // del
            if ((rest = await checkPermission(req, res, 'delete')) === null) {
                return
            }
            res.json(await deleteData(rest.modelId, req.params.suffix))
            return
        }
    
        if (req.method === 'DELETE' && req.params.suffix === undefined) {
            // bulk del
            if ((rest = await checkPermission(req, res, 'bulkDelete')) === null) {
                return
            }
            res.json(await deleteData(rest.modelId, req.body))
            return
        }

        next()
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error.message })
    }
})

module.exports = {
    rest: router
}