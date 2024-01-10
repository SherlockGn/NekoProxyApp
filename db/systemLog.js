const { DataTypes } = require('sequelize')

const { connection } = require('./database')

const SystemLog = connection.define('systemLog', {
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'string',
        validate: {
            isIn: [['string', 'object']]
        }
    },
    level: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'info',
        validate: {
            isIn: [['trace', 'debug', 'info', 'warn', 'error', 'fatal']]
        }
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
    }
})

module.exports = {
    SystemLog
}