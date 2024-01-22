const now = new Date().toJSON()

const properties = [
    {
        'id': 1,
        'name': 'name',
        'type': 'TEXT',
        'defaultValue': null,
        'allowNull': false,
        'unique': false,
        'validate': '{"notEmpty":true}',
        'createdAt': now,
        'updatedAt': now,
        'modelId': 1
    },
    {
        'id': 2,
        'name': 'score',
        'type': 'INTEGER',
        'defaultValue': '100',
        'allowNull': false,
        'unique': false,
        'validate': '{"isNumeric":true,"max":100,"min":0}',
        'createdAt': now,
        'updatedAt': now,
        'modelId': 1
    },
    {
        'id': 3,
        'name': 'name',
        'type': 'TEXT',
        'defaultValue': null,
        'allowNull': false,
        'unique': false,
        'validate': '{"notEmpty":true}',
        'createdAt': now,
        'updatedAt': now,
        'modelId': 2
    }
]

const add = (property, modelId) => {
    property.id = properties.length + 1
    property.modelId = Number(modelId)
    property.createdAt = new Date().toJSON()
    property.updatedAt = new Date().toJSON()
    property.defaultValue =
        property.defaultValue === null
            ? null
            : JSON.stringify(property.defaultValue)
    property.validate =
        property.validate === null ? null : JSON.stringify(property.validate)
    properties.push(property)
}

const get = modelId => {
    return properties.filter(i => i.modelId === Number(modelId))
}

const getById = id => {
    return properties.find(i => i.id === Number(id))
}

const update = (property, id) => {
    if (property.defaultValue !== undefined && property.defaultValue !== null) {
        property.defaultValue = JSON.stringify(property.defaultValue)
    }
    if (property.validate !== undefined && property.validate !== null) {
        property.validate = JSON.stringify(property.validate)
    }
    const r = properties.find(r => r.id === Number(id))
    if (r) {
        for (const k in property) {
            r[k] = property[k]
        }
        r.updatedAt = new Date().toJSON()
    }
}

const del = id => {
    const i = properties.findIndex(r => r.id === id)
    if (i > -1) {
        properties.splice(i, 1)
    }
}

export default {
    add,
    get,
    getById,
    update,
    del
}
