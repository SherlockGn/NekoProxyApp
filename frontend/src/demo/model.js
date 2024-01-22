const now = new Date().toJSON()

const models = [
    {
        'id': 1,
        'name': 'Student',
        'dbName': 'MyFirstDB',
        'createdAt': now,
        'updatedAt': now
    },
    {
        'id': 2,
        'name': 'Teacher',
        'dbName': 'MyFirstDB',
        'createdAt': now,
        'updatedAt': now
    },
    {
        'id': 3,
        'name': 'Toils',
        'dbName': 'NekoDatabase',
        'createdAt': now,
        'updatedAt': now
    }
]

const add = model => {
    model.id = models.length + 1
    model.createdAt = new Date().toJSON()
    model.updatedAt = new Date().toJSON()
    models.push(model)
}

const get = dbName => {
    return models.filter(i => i.dbName === dbName)
}

const getById = id => {
    return models.find(i => i.id === Number(id))
}

const del = id => {
    const i = models.findIndex(r => r.id === id)
    if (i > -1) {
        models.splice(i, 1)
    }
}

export default {
    add,
    get,
    getById,
    del
}
