const { createProperty, queryProperties, queryPropertyById, updateProperty, deleteProperty } = require('../service/datacenter')

const add = async (property, modelId) => {
    return await createProperty(property, modelId)
}

const get = async (modelId) => {
    return await queryProperties(modelId)
}

const getById = async (id) => {
    return queryPropertyById(id)
}

const update = async (property, id) => {
    return await updateProperty(property, id)
}

const del = async id => {
    return await deleteProperty(id)
}

module.exports = {
    add,
    get,
    getById,
    update,
    del
}