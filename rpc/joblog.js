const { Op } = require('sequelize')

const { connection } = require('../db/database')
const { JobLog } = require('../db/jobLog')

const get = async (timerange, keyword, offset, limit) => {
    const where = {}
    where[Op.or] = [
        {
            name: { [Op.substring]: keyword }
        },
        {
            status: { [Op.substring]: keyword }
        },
        {
            transaction: { [Op.substring]: keyword }
        },
        {
            output: { [Op.substring]: keyword }
        },
        {
            error: { [Op.substring]: keyword }
        }
    ]
    if (timerange !== null) {
        where.createdAt = {
            [Op.between]: timerange.map(t => new Date(t))
        }
    }
    return {
        data: await JobLog.findAll({
            where,
            offset,
            limit,
            order: [['createdAt', 'DESC']]
        }),
        count: await JobLog.count({
            where
        })
    }
}

const clear = async () => {
    return await JobLog.truncate()
}

module.exports = {
    get,
    clear
}
