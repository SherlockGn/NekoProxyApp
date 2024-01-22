const now = new Date().toJSON()

const rules = [
    {
        'id': 1,
        'name': 'Share my file',
        'description': 'This app help display all files of your server',
        'enabled': true,
        'port': 8888,
        'host': 'share-my-file.com:3000',
        'filter': '    return true',
        'path': '    return req.originalUrl',
        'req': '    return req',
        'reqBody': '    return body',
        'resBody': '    return body',
        'resHeader': '    return headers',
        'limit': '1mb',
        'parseReqBody': true,
        'reqAsBuffer': true,
        'timeout': null,
        'memoizeHost': false,
        'https': false,
        'sequence': 1,
        'createdAt': now,
        'updatedAt': now
    },
    {
        'id': 2,
        'name': 'Mahjong app',
        'description': 'A great Mahjong helper!',
        'enabled': true,
        'port': 9999,
        'host': 'localhost:3444',
        'filter': '    return true',
        'path': '    return req.originalUrl',
        'req': '    return req',
        'reqBody': '    return body',
        'resBody': '    return body',
        'resHeader': '    return headers',
        'limit': '3gb',
        'parseReqBody': true,
        'reqAsBuffer': true,
        'timeout': 2000,
        'memoizeHost': false,
        'https': false,
        'sequence': 2,
        'createdAt': now,
        'updatedAt': now
    }
]

const add = rule => {
    rule.id = rules.length + 1
    rule.sequence = rules.length + 1
    rule.createdAt = new Date().toJSON()
    rule.updatedAt = new Date().toJSON()
    rules.push(rule)
}

const get = where => {
    if (!where) {
        return [...rules].sort((a, b) => a.sequence - b.sequence)
    }
    if (where.id) {
        return rules.filter(r => r.id === Number(where.id))
    }
}

const update = (id, rule) => {
    const r = rules.find(r => r.id === Number(id))
    if (r) {
        for (const k in rule) {
            r[k] = rule[k]
        }
        r.updatedAt = new Date().toJSON()
    }
}

const updateSeq = seqList => {
    seqList.forEach(seq => {
        const r = rules.find(r => r.id === Number(seq.id))
        if (r) {
            r.sequence = seq.sequence
            r.updatedAt = new Date().toJSON()
        }
    })
}

const del = id => {
    const i = rules.findIndex(r => r.id === Number(id))
    if (i > -1) {
        rules.splice(i, 1)
    }
}

export default {
    add,
    get,
    update,
    updateSeq,
    del
}
