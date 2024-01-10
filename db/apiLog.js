const { DataTypes } = require('sequelize')

const { connection } = require('./database')

const ApiLog = connection.define('apiLog', {
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
    module: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
    },
    func: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
    }
})

module.exports = {
    ApiLog
}