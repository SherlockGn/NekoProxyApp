const { Op } = require('sequelize')

const { connection } = require('../db/database')
const { SystemLog } = require('../db/systemLog')

const get = async (timerange, keyword, offset, limit) => {
    const where = {}
    where.content = {
        [Op.substring]: keyword
    }
    if (timerange !== null) {
        where.createdAt = {
            [Op.between]: timerange.map(t => new Date(t))
        }
    }
    return {
        data: await SystemLog.findAll({
            where,
            offset,
            limit,
            order: [['createdAt', 'DESC']]
        }),
        count: await SystemLog.count({
            where,
        })
    } 
}

module.exports = {
    get
}