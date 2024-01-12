const { Op } = require('sequelize')

const { connection } = require('../db/database')
const { ProjectLog } = require('../db/projectLog')

const get = async (timerange, keyword, offset, limit) => {
    const where = {}
    where[Op.or] = [
        {
            name: { [Op.substring]: keyword }
        },
        {
            command: { [Op.substring]: keyword }
        },
        {
            trigger: { [Op.substring]: keyword }
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
        data: await ProjectLog.findAll({
            where,
            offset,
            limit,
            order: [['createdAt', 'DESC']]
        }),
        count: await ProjectLog.count({
            where,
        })
    } 
}

module.exports = {
    get
}