const { queryModels, queryModelById, createModel, deleteModel } = require('../service/datacenter')

const add = async model => {
    return await createModel(model)
}

const get = async dbName => {
    return await queryModels(dbName)
}

const getById = async id => {
    return await queryModelById(id)
}

const del = async id => {
    return await deleteModel(id)
}

module.exports = {
    add,
    get,
    getById,
    del
}