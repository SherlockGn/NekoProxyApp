const and = value => {
    if (!Array.isArray(value)) {
        throw new Error('$and expects an array')
    }
    const filters = value.map(objToFilter)
    return e => filters.every(f => f(e))
}

const or = value => {
    if (!Array.isArray(value)) {
        throw new Error('$or expects an array')
    }
    const filters = value.map(objToFilter)
    return e => filters.some(f => f(e))
}

const not = value => {
    const filter = objToFilter(value)
    return e => !filter(e)
}

const eq = (attr, value) => {
    return e => e[attr] === value
}

const ne = (attr, value) => {
    return e => e[attr] !== value
}

const inList = (attr, value) => {
    if (!Array.isArray(value)) {
        value = [value]
    }
    return e => value.includes(e[attr])
}

const notIn = (attr, value) => {
    return e => !inList(attr, value)(e)
}

const gt = (attr, value) => {
    return e => e[attr] > value
}

const gte = (attr, value) => {
    return e => e[attr] >= value
}

const lt = (attr, value) => {
    return e => e[attr] < value
}

const lte = (attr, value) => {
    return e => e[attr] <= value
}

const between = (attr, value) => {
    if (!Array.isArray(value) || value.length !== 2) {
        throw new Error('$between expects an array of length 2')
    }
    return e => value[0] <= e[attr] && e[attr] <= value[1]
}

const notBetween = (attr, value) => {
    return e => !between(attr, value)(e)
}

const like = (attr, value) => {
    const reg = new RegExp(value.replace(/%/g, '.*'))
    return e => reg.test(e[attr])
}

const notLike = (attr, value) => {
    return e => !like(attr, value)(e)
}

const iLike = (attr, value) => {
    const reg = new RegExp(value.replace(/%/g, '.*'), 'i')
    return e => reg.test(e[attr])
}

const notILike = (attr, value) => {
    return e => !iLike(attr, value)(e)
}

const startsWith = (attr, value) => {
    return e => e[attr].startsWith(value)
}

const endsWith = (attr, value) => {
    return e => e[attr].endsWith(value)
}

const substring = (attr, value) => {
    return e => e[attr].includes(value)
}

const regexp = (attr, value) => {
    const reg = new RegExp(value)
    return e => reg.test(e[attr])
}

const notRegexp = (attr, value) => {
    return e => !regexp(attr, value)(e)
}

const iRegexp = (attr, value) => {
    const reg = new RegExp(value, 'i')
    return e => reg.test(e[attr])
}

const notIRegexp = (attr, value) => {
    return e => !iRegexp(attr, value)(e)
}

const attrConditionToFilter = (attr, op, value) => {
    if (value.constructor.name === 'Object') {
        throw new Error('expects a value')
    }
    if (op === '$eq' || op === '$is') {
        return eq(attr, value)
    }
    if (op === '$ne' || op === '$not') {
        return ne(attr, value)
    }
    if (op === '$in' || op === '$or') {
        return inList(attr, value)
    }
    if (op === '$notIn') {
        return notIn(attr, value)
    }
    if (op === '$gt') {
        return gt(attr, value)
    }
    if (op === '$gte') {
        return gte(attr, value)
    }
    if (op === '$lt') {
        return lt(attr, value)
    }
    if (op === '$lte') {
        return lte(attr, value)
    }
    if (op === '$between') {
        return between(attr, value)
    }
    if (op === '$notBetween') {
        return notBetween(attr, value)
    }
    if (op === '$like') {
        return like(attr, value)
    }
    if (op === '$notLike') {
        return notLike(attr, value)
    }
    if (op === '$iLike') {
        return iLike(attr, value)
    }
    if (op === '$notILike') {
        return notILike(attr, value)
    }
    if (op === '$startsWith') {
        return startsWith(attr, value)
    }
    if (op === '$endsWith') {
        return endsWith(attr, value)
    }
    if (op === '$substring') {
        return substring(attr, value)
    }
    if (op === '$regexp') {
        return regexp(attr, value)
    }
    if (op === '$notRegexp') {
        return notRegexp(attr, value)
    }
    if (op === '$iRegexp') {
        return iRegexp(attr, value)
    }
    if (op === '$notIRegexp') {
        return notIRegexp(attr, value)
    }
    throw new Error(`unsupported operator: ${op}`)
}

const keyValueToFilter = (key, value) => {
    if (key === '$and') {
        // $and: [{ prop1: 5 }, { prop2: 'hello' }]
        return and(value)
    }
    if (key === '$or') {
        // $or: [{ prop1: 5 }, { prop2: 'hello' }]
        return or(value)
    }
    if (key === '$not') {
        // $not: { prop1: 3 }
        return not(value)
    }
    // key is attr
    if (value.constructor.name !== 'Object') {
        // prop1: 'abc'
        return eq(key, value)
    } else {
        // prop1: { $gt: 12, $le: 20 }
        const keys = Object.keys(value)
        const filters = keys.map(k => attrConditionToFilter(key, k, value[k]))
        return e => filters.every(f => f(e))
    }
}

export const objToFilter = obj => {
    if (obj.constructor.name !== 'Object') {
        throw new Error('expects an object')
    }
    const filters = Object.keys(obj).map(key => keyValueToFilter(key, obj[key]))
    return e => filters.every(f => f(e))
}
