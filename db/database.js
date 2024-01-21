const fs = require('fs')

const { Sequelize, Op } = require('sequelize')

const { dialect, host, username, password } = require('../config.json').database

const databaseName = 'app'

let storage = undefined
if (dialect === 'sqlite') {
    if (!fs.existsSync('runtime')) {
        fs.mkdirSync('runtime')
    }
    storage = `runtime/${databaseName}.db`
}

const connection = new Sequelize(databaseName, username, password, {
    dialect,
    storage,
    host,
    logging: false
})

try {
    connection.authenticate()
} catch (error) {
    console.error('Unable to connect to the database:', error)
    process.exit(1)
}

const toWhere = customWhere => {
    if (customWhere instanceof Array) {
        return customWhere.map(toWhere)
    }
    if (customWhere instanceof Object) {
        const where = {}
        for (const [key, value] of Object.entries(customWhere)) {
            if (key.startsWith('$')) {
                where[Op[key.substring(1)]] = toWhere(value)
            } else {
                where[key] = toWhere(value)
            }
        }
        return where
    }
    return customWhere
}

module.exports = {
    connection,
    toWhere
}
