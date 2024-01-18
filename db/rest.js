const { DataTypes } = require('sequelize')

const { connection } = require('./database')

const Rest = connection.define('rest', {
    token: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    query: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    advancedQuery: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    queryByPk: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    create: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    update: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    delete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    bulkDelete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
})

module.exports = {
    Rest
}
