const {
    createData,
    queryData,
    updateData,
    deleteData
} = require('../service/datacenter')

module.exports = {
    add: createData,
    get: queryData,
    update: updateData,
    del: deleteData
}
