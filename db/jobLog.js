const { DataTypes } = require('sequelize')

const { connection } = require('./database')

const JobLog = connection.define('jobLog', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
    },
    transaction: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'start',
        validate: {
            isIn: [['start', 'end']]
        }
    },
    output: {
        type: DataTypes.STRING,
        allowNull: true
    },
    error: {
        type: DataTypes.STRING,
        allowNull: true
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
})

module.exports = {
    JobLog
}
