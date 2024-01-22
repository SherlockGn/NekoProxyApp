const now = new Date().toJSON()

const dbs = [
    {
        'size': 12345,
        'name': 'MyFirstDB',
        'createdAt': now,
        'updatedAt': now
    },
    {
        'size': 54321,
        'name': 'NekoDatabase',
        'createdAt': now,
        'updatedAt': now
    }
]

const add = name => {
    dbs.push({
        size: 0,
        name,
        createdAt: new Date().toJSON(),
        updatedAt: new Date().toJSON()
    })
}

const get = () => {
    return [...dbs]
}

const del = name => {
    const i = dbs.findIndex(r => r.name === name)
    if (i > -1) {
        dbs.splice(i, 1)
    }
}

export default {
    add,
    get,
    del
}
