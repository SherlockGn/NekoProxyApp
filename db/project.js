const { DataTypes } = require('sequelize')

const { connection } = require('./database')

const Project = connection.define('project', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Static',
        validate: {
            isIn: [['Static', 'NodeServer']]
        }
    },
    port: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    script: {
        type: DataTypes.STRING,
        allowNull: true
    },
    args: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
    },
    repo: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
    },
    branch: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'master'
    }
})

module.exports = {
    Project
}