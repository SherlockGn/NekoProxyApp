const { join } = require('path')
const fs = require('fs')

const { Sequelize, DataTypes } = require('sequelize')

const { connection, toWhere } = require('../db/database')
const { logger } = require('./log')
const { Model } = require('../db/model')
const { Property } = require('../db/property')

const folder = join(__dirname, '..', 'runtime', 'datacenter')

const dbPath = dbName => {
    return join(folder, `${dbName}.db`)
}

class DataCenterConn {
    constructor(dbName, connTimeout) {
        this.dbName = dbName
        this.connTimeout = connTimeout
        this.sequelize = null
        this.timer = null
        this.onclose = null
    }

    async init(t) {
        if (this.sequelize) {
            await this.close()
        }

        logger.info(`Starting data center db: ${this.dbName}`)
        this.sequelize = new Sequelize(this.dbName, null, null, {
            dialect: 'sqlite',
            storage: dbPath(this.dbName),
            logging: false
        })

        this.resetTimer()
        await this.load(t)
    }

    async load(t) {
        const models = await Model.findAll({
            where: { dbName: this.dbName },
            transaction: t,
            include: [Property]
        })
        models.forEach(model => {
            const properties = {}
            model.properties.map(i => i.dataValues).forEach(property => {
                const pro = {}
                pro.type = DataTypes[property.type]
                pro.typeText = property.type
                if (property.allowNull !== null) {
                    pro.allowNull = property.allowNull
                }
                if (property.defaultValue !== null) {
                    pro.defaultValue = JSON.parse(property.defaultValue)
                    const prefix = '#DataTypes.'
                    if (typeof pro.defaultValue === 'string' && pro.defaultValue.startsWith(prefix) && pro.defaultValue.endsWith('#')) {
                        pro.defaultValue = DataTypes[pro.defaultValue.substring(prefix.length, pro.defaultValue.length - 1)]
                    }
                }
                if (property.unique !== null) {
                    pro.unique = property.unique
                }
                if (property.validate !== null) {
                    pro.validate = JSON.parse(property.validate)
                }
                properties[property.name] = pro
            })
            logger.trace({
                name: model.name,
                properties
            })
            this.sequelize.define(model.name, properties)
        })
        await this.sequelize.sync({ alter: true })
    }

    resetTimer() {
        if (this.timer) {
            clearTimeout(this.timer)
        }

        this.timer = setTimeout(() => {
            this.close()
        }, this.connTimeout)
    }

    async close() {
        if (this.timer) {
            clearTimeout(this.timer)
        }
        this.timer = null
        logger.info(`Closing data center db: ${this.dbName}`)
        await this.sequelize.close()
        this.sequelize = null
        if (this.onclose) {
            await this.onclose()
        }
    }

    async instance() {
        if (this.sequelize) {
            this.resetTimer()
            return this.sequelize
        } else {
            await this.init()
            return this.sequelize
        }
    }
}

class DataCenterConnFactory {
    static connMappers = {}

    static getConn(dbName) {
        if (!DataCenterConnFactory.connMappers[dbName]) {
            DataCenterConnFactory.connMappers[dbName] = new DataCenterConn(dbName, 15000)
            DataCenterConnFactory.connMappers[dbName].onclose = () => {
                delete DataCenterConnFactory.connMappers[dbName]
            }
        }
        return this.connMappers[dbName]
    }

    static async actionIfConnected(dbName, action) {
        if (!action || !DataCenterConnFactory.connMappers[dbName]) {
            return
        }
        await action(DataCenterConnFactory.connMappers[dbName])
    }
}

const queryDb = async () => {
    let fileNames
    try {
        fileNames = fs.readdirSync(folder)
    } catch {
        return []
    }
    return fileNames.filter(f => f.endsWith('.db')).map(f => {
        const file = fs.statSync(join(folder, f))
        return {
            size: file.size,
            name: f.substring(0, f.lastIndexOf('.')),
            createdAt: file.birthtime,
            updatedAt: file.mtime
        }
    })
}

const createDb = async (dbName) => {
    const instance = await DataCenterConnFactory.getConn(dbName).instance()
    await instance.authenticate()
}

const deleteDb = async (dbName) => {
    await DataCenterConnFactory.actionIfConnected(dbName, async conn => await conn.close())
    fs.unlinkSync(join(folder, dbName + '.db'))
}

const queryModels  = async (dbName) => {
    return await Model.findAll({ where: { dbName } })
}

const queryModelById = async id => {
    return await Model.findByPk(id)
}

const createModel = async (model) => {
    const ret = await Model.create(model)
    await DataCenterConnFactory.getConn(model.dbName).init()

    return ret
}

const deleteModel = async (id) => {
    const model = await Model.findByPk(id)
    await Model.destroy({ where: { id } })
    const instance = await DataCenterConnFactory.getConn(model.dbName).instance()
    await instance.models[model.name].drop()
    await DataCenterConnFactory.getConn(model.dbName).init()
}

const queryProperties = async (modelId) => {
    return await Property.findAll({ where: { modelId } })
}

const queryPropertyById = async id => {
    return await Property.findByPk(id)
}

const createProperty = async (property, modelId) => {
    property.modelId = modelId
    property.defaultValue = property.defaultValue === null ? null : JSON.stringify(property.defaultValue)
    property.validate = property.validate === null ? null : JSON.stringify(property.validate)

    let ret
    let model
    try {
        await connection.transaction(async t => {
            ret = await Property.create(property, { transaction: t })
            model = await Model.findByPk(modelId, { transaction: t })
            await DataCenterConnFactory.getConn(model.dbName).init(t)
        })
    } catch (error) {
        // already rollback
        await DataCenterConnFactory.getConn(model.dbName).init()
        throw error
    }
    
    return ret
}

const updateProperty = async (property, id) => {
    if (property.defaultValue !== undefined && property.defaultValue !== null) {
        property.defaultValue = JSON.stringify(property.defaultValue)
    }
    if (property.validate !== undefined && property.validate !== null) {
        property.validate = JSON.stringify(property.validate)
    }
    let ret
    let model
    try {
        await connection.transaction(async t => {
            ret = await Property.update(property, { where: { id }, transaction: t })
            property = await Property.findByPk(id, { transaction: t })
            model = await Model.findByPk(property.modelId, { transaction: t })
            await DataCenterConnFactory.getConn(model.dbName).init(t)
        })
    } catch (error) {
        // already rollback
        await DataCenterConnFactory.getConn(model.dbName).init()
        throw error
    }
    

    return ret
}

const deleteProperty = async (id) => {
    const property = await Property.findByPk(id)
    const ret = await Property.destroy({ where: { id } })
    const model = await Model.findByPk(property.modelId)

    // const instance = await DataCenterConnFactory.getConn(model.dbName).instance()
    // const tableName = instance.models[model.name].getTableName()
    // await instance.query(`ALTER TABLE ${tableName} DROP COLUMN ${property.name}`)
    await DataCenterConnFactory.getConn(model.dbName).init()

    return ret
}

const createData = async (modelId, data) => {
    const model = await Model.findByPk(modelId)
    const instance = await DataCenterConnFactory.getConn(model.dbName).instance()
    if (data instanceof Array) {
        return instance.models[model.name].bulkCreate(data, {
            validate: true
        })
    }
    return instance.models[model.name].create(data)
}

const queryData = async (modelId, where, offset, limit, order) => {
    const model = await Model.findByPk(modelId)
    const instance = await DataCenterConnFactory.getConn(model.dbName).instance()
    return instance.models[model.name].findAll({
        where: toWhere(where),
        offset,
        limit,
        order
    })
}

const updateDataItem = async (instance, model, data, t) => {
    if (data.id === undefined || data.id === null) {
        throw new Error('id MUST be specified')
    }
    const id = data.id
    return await instance.models[model.name].update(data, { where: { id }, transaction: t } )
}

const updateData = async (modelId, data) => {
    const model = await Model.findByPk(modelId)
    const instance = await DataCenterConnFactory.getConn(model.dbName).instance()
    if (data instanceof Array) {
        return await instance.transaction(async t => {
            for (const item of data) {
                await updateDataItem(instance, model, item, t)
            }
        })
    }
    return updateDataItem(instance, model, data)
}

const deleteData = async (modelId, idList) => {
    const model = await Model.findByPk(modelId)
    const instance = await DataCenterConnFactory.getConn(model.dbName).instance()
    if (idList instanceof Array) {
        return await instance.transaction(async t => {
            for (const id of idList) {
                await instance.models[model.name].destroy({ where: { id }, transaction: t })
            }
        })
    }
    return await instance.models[model.name].destroy({ where: { id: idList } })
}

module.exports = {
    DataCenterConn,
    DataCenterConnFactory,
    queryDb,
    createDb,
    deleteDb,
    queryModels,
    queryModelById,
    createModel,
    deleteModel,
    queryProperties,
    queryPropertyById,
    createProperty,
    updateProperty,
    deleteProperty,
    createData,
    queryData,
    updateData,
    deleteData
}