const now = new Date().toJSON()

const generateUUID = () => {
    let timestamp = new Date().getTime()
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = (timestamp + Math.random() * 16) % 16 | 0
        timestamp = Math.floor(timestamp / 16)
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
    })
    return uuid
}

const rests = [
    {
        'id': 1,
        'token': 'a35d2a16-bd38-40a1-a0ba-3983393f03f5',
        'query': true,
        'advancedQuery': true,
        'queryByPk': true,
        'create': true,
        'update': true,
        'delete': true,
        'bulkDelete': true,
        'createdAt': now,
        'updatedAt': now,
        'modelId': 1
    }
]

const add = modelId => {
    const rest = {
        id: rests.length + 1,
        token: generateUUID(),
        'query': true,
        'advancedQuery': true,
        'queryByPk': true,
        'create': true,
        'update': true,
        'delete': true,
        'bulkDelete': true,
        'createdAt': new Date().toJSON(),
        'updatedAt': new Date().toJSON(),
        modelId: Number(modelId)
    }
    rests.push(rest)
    return rest
}

const update = (id, rest) => {
    const r = rests.find(r => r.id === Number(id))
    if (r) {
        for (const k in rest) {
            r[k] = rest[k]
        }
        r.updatedAt = new Date().toJSON()
    }
}

const get = modelId => {
    const t = rests.find(i => i.modelId === Number(modelId))
    if (t) {
        return { ...t }
    }
    return null
}

const renewToken = id => {
    const r = rests.find(r => r.id === Number(id))
    if (r) {
        r.token = generateUUID()
        r.updatedAt = new Date().toJSON()
    }
}

const del = id => {
    const i = rests.findIndex(r => r.id === id)
    if (i > -1) {
        rests.splice(i, 1)
    }
}

export default {
    add,
    get,
    update,
    del,
    renewToken
}
