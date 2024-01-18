const { queryDb, createDb, deleteDb } = require('../service/datacenter')

module.exports = {
    add: createDb,
    get: queryDb,
    del: deleteDb
}
