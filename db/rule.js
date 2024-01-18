const { DataTypes } = require('sequelize')

const { connection } = require('./database')
const { port } = require('../config.json')

const Rule = connection.define('rule', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
        defaultValue: 'New Rule'
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    port: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: port
    },
    host: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
        defaultValue: 'example.com'
    },
    filter: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
        defaultValue: '    return true'
    },
    path: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
        defaultValue: '    return req.originalUrl'
    },
    req: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
        defaultValue: '    return req'
    },
    reqBody: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
        defaultValue: '    return body'
    },
    resBody: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
        defaultValue: '    return body'
    },
    resHeader: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
        defaultValue: '    return headers'
    },
    limit: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
        defaultValue: '1mb'
    },
    parseReqBody: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    reqAsBuffer: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    timeout: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null
    },
    memoizeHost: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    https: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    sequence: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
})

module.exports = {
    Rule
}
