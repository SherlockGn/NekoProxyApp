const { createProperty, queryProperties, queryPropertyById, updateProperty, deleteProperty } = require('../service/datacenter')

module.exports = {
    add: createProperty,
    get: queryProperties,
    getById: queryPropertyById,
    update: updateProperty,
    del: deleteProperty,
}