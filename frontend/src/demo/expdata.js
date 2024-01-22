const now = new Date().toJSON()

const data = {
    1: [
        {
            id: 1,
            name: 'Zhangsan',
            score: 90,
            createdAt: now,
            updatedAt: now
        },
        {
            id: 2,
            name: 'Lisi',
            score: 80,
            createdAt: now,
            updatedAt: now
        },
        {
            id: 3,
            name: 'Wangwu',
            score: 70,
            createdAt: now,
            updatedAt: now
        },
        {
            id: 4,
            name: 'Neko',
            score: 100,
            createdAt: now,
            updatedAt: now
        }
    ],
    2: [
        {
            id: 1,
            name: 'Mr. Chen',
            createdAt: now,
            updatedAt: now
        }
    ]
}

const getSet = modelId => {
    if (data[modelId] === undefined) {
        data[modelId] = []
    }
    return data[modelId]
}

const add = (modelId, data) => {
    if (!(data instanceof Array)) {
        data = [data]
    }
    for (const d of data) {
        d.id = getSet(modelId).length + 1
        d.createdAt = new Date().toJSON()
        d.updatedAt = new Date().toJSON()
        getSet(modelId).push(d)
    }
}

const get = (modelId, where, offset, limit, order) => {
    return [...getSet(modelId)]
}

const update = (modelId, data) => {
    if (!(data instanceof Array)) {
        data = [data]
    }
    for (const d of data) {
        const r = getSet(modelId).find(r => r.id === Number(d.id))
        if (r) {
            for (const k in d) {
                r[k] = d[k]
            }
            r.updatedAt = new Date().toJSON()
        }
    }
}

const del = (modelId, idList) => {
    if (!(idList instanceof Array)) {
        idList = [idList]
    }
    for (const id of idList) {
        const i = getSet(modelId).findIndex(r => r.id === id)
        if (i > -1) {
            getSet(modelId).splice(i, 1)
        }
    }
}

export default {
    add,
    get,
    update,
    del
}
