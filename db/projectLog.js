const { DataTypes } = require('sequelize')

const { connection } = require('./database')

const ProjectLog = connection.define('projectLog', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
    },
    command: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
    },
    trigger: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'manual',
        validate: {
            isIn: [['init', 'manual', 'github', 'gitee']]
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
        allowNull: false,
        defaultValue: 0
    }
})

module.exports = {
    ProjectLog,
}