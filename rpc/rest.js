const { v4 } = require('uuid')

const { connection } = require('../db/database')
const { Rest } = require('../db/rest')

const add = async modelId => {
    return await Rest.create({
        modelId
    })
}

const get = async modelId => {
    return await Rest.findOne({
        where: {
            modelId
        }
    })
}

const update = async (id, rest) => {
    return await Rest.update(rest, {
        where: {
            id
        }
    })
}

const renewToken = async id => {
    return await Rest.update(
        {
            token: v4()
        },
        {
            where: {
                id
            }
        }
    )
}

const del = async id => {
    return await Rest.destroy({
        where: {
            id
        }
    })
}

module.exports = {
    add,
    del,
    update,
    renewToken,
    get
}
