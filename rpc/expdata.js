const { createData, queryData, updateData, deleteData } = require('../service/datacenter')

const add = async (modelId, data) => {
    return await createData(modelId, data)
}

const get = async (modelId, where, offset, limit, order) => {
    return await queryData(modelId, where, offset, limit, order)
}

const update = async (modelId, data) => {
    return await updateData(modelId, data)
}

const del = async (modelId, idList) => {
    return await deleteData(modelId, idList)
}

module.exports = {
    add,
    get,
    update,
    del
}