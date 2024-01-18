const { DataTypes } = require('sequelize')

const { connection } = require('./database')
const { Rule } = require('./rule')

const ProxyLog = connection.define('proxyLog', {
    url: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
    },
    method: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    transaction: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    reqLength: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    resLength: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    ruleName: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ''
    }
})

module.exports = {
    ProxyLog
}
