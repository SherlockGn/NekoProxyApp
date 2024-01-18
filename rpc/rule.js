const { connection } = require('../db/database')
const { Rule } = require('../db/rule')
const { refreshProxies } = require('../service/gateway')

const add = async rule => {
    const ret = await Rule.create(rule)
    await ret.update({
        sequence: ret.id
    })
    refreshProxies()
    return ret
}

const get = async where => {
    const ret = await Rule.findAll({
        where,
        order: [['sequence', 'ASC']]
    })
    refreshProxies()
    return ret
}

const update = async (id, rule) => {
    const ret = await Rule.update(rule, {
        where: {
            id
        }
    })
    refreshProxies()
    return ret
}

const updateSeq = async seqList => {
    const rets = []
    await connection.transaction(async t => {
        for (const seq of seqList) {
            rets.push(
                await Rule.update(
                    {
                        sequence: seq.sequence
                    },
                    {
                        where: {
                            id: seq.id
                        }
                    }
                )
            )
        }
    })
    refreshProxies()
    return rets
}

const del = async id => {
    const ret = await Rule.destroy({
        where: {
            id
        }
    })
    refreshProxies()
    return ret
}

module.exports = {
    add,
    del,
    update,
    updateSeq,
    get
}
