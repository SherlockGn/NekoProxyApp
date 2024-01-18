const { Op } = require('sequelize')

const { connection } = require('../db/database')
const { RestLog } = require('../db/restLog')

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
            type: { [Op.substring]: keyword }
        },
        {
            db: { [Op.substring]: keyword }
        },
        {
            model: { [Op.substring]: keyword }
        }
    ]
    if (timerange !== null) {
        where.createdAt = {
            [Op.between]: timerange.map(t => new Date(t))
        }
    }
    return {
        data: await RestLog.findAll({
            where,
            offset,
            limit,
            order: [['createdAt', 'DESC']]
        }),
        count: await RestLog.count({
            where
        })
    }
}

module.exports = {
    get
}
