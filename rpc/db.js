const { queryDb, createDb, deleteDb } = require('../service/datacenter')

const add = async name => {
    await createDb(name)
}

const get = async () => {
    return await queryDb()
}

const del = async name => {
    await deleteDb(name)
}

module.exports = {
    add,
    get,
    del
}