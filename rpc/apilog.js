const { Op } = require('sequelize')

const { connection } = require('../db/database')
const { ApiLog } = require('../db/apiLog')

const get = async (timerange, keyword, offset, limit) => {
    const where = {}
    where[Op.or] = [
        {
            url: { [Op.substring]: keyword }
        },
        {
            method: { [Op.substring]: keyword }
        },
        {
            status: { [Op.substring]: keyword }
        },
        {
            transaction: { [Op.substring]: keyword }
        },
        {
            module: { [Op.substring]: keyword }
        },
        {
            func: { [Op.substring]: keyword }
        }
    ]
    if (timerange !== null) {
        where.createdAt = {
            [Op.between]: timerange.map(t => new Date(t))
        }
    }
    return {
        data: await ApiLog.findAll({
            where,
            offset,
            limit,
            order: [['createdAt', 'DESC']]
        }),
        count: await ApiLog.count({
            where
        })
    }
}

const clear = async () => {
    return await ApiLog.truncate()
}

module.exports = {
    get,
    clear
}
