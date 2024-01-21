const { DataTypes } = require('sequelize')

const { connection } = require('./database')

const Job = connection.define('job', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
        defaultValue: 'New Job'
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
    cron: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '* * * * * *'
    },
    script: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: ''
    }
})

module.exports = {
    Job
}
