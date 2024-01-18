const { Op } = require('sequelize')

const { connection, toWhere } = require('../db/database')
const { ProxyLog } = require('../db/proxyLog')
const { Rule } = require('../db/rule')

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
            ruleName: { [Op.substring]: keyword }
        }
    ]
    if (timerange !== null) {
        where.createdAt = {
            [Op.between]: timerange.map(t => new Date(t))
        }
    }
    return {
        data: await ProxyLog.findAll({
            where,
            offset,
            limit,
            include: [Rule],
            order: [['createdAt', 'DESC']]
        }),
        count: await ProxyLog.count({
            where
        })
    }
}

const stat = async (
    timerange,
    customWhere,
    isTimeChart,
    timechartLevel,
    func,
    col,
    groupBy
) => {
    const where = {}

    where[Op.and] = []

    if (timerange !== null) {
        where[Op.and].push({
            createdAt: {
                [Op.between]: timerange.map(t => new Date(t))
            }
        })
    }

    if (customWhere !== null) {
        where[Op.and].push(toWhere(customWhere))
    }

    const attributes = [...groupBy]

    if (isTimeChart) {
        let formatter = ''
        if (timechartLevel === 'year') {
            formatter = '%Y-01-01T00:00:00.000Z'
        }
        if (timechartLevel === 'month') {
            formatter = '%Y-%m-01T00:00:00.000Z'
        }
        if (timechartLevel === 'day') {
            formatter = '%Y-%m-%dT00:00:00.000Z'
        }
        if (timechartLevel === 'hour') {
            formatter = '%Y-%m-%dT%H:00:00.000Z'
        }
        if (timechartLevel === 'minute') {
            formatter = '%Y-%m-%dT%H:%M:00.000Z'
        }
        if (timechartLevel === 'second') {
            formatter = '%Y-%m-%dT%H:%M:%S.000Z'
        }
        attributes.push([
            connection.fn('strftime', formatter, connection.col('createdAt')),
            'date_format'
        ])
    }

    attributes.push([connection.fn(func, connection.col(col)), 'stat_target'])

    const group = [...groupBy]

    if (isTimeChart) {
        group.push('date_format')
    }

    return await ProxyLog.findAll({
        where,
        attributes,
        group
    })
}

module.exports = {
    get,
    stat
}
