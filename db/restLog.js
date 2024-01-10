const { DataTypes } = require('sequelize')

const { connection } = require('./database')

const RestLog = connection.define('restLog', {
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
    db: {
        type: DataTypes.STRING,
        allowNull: true
    },
    model: {
        type: DataTypes.STRING,
        allowNull: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
    }
})

module.exports = {
    RestLog
}