const {
    queryModels,
    queryModelById,
    createModel,
    deleteModel
} = require('../service/datacenter')

module.exports = {
    add: createModel,
    get: queryModels,
    getById: queryModelById,
    del: deleteModel
}
