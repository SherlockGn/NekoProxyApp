const { DataTypes } = require('sequelize')

const { connection } = require('./database')

const Model = connection.define('model', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    dbName: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
        validate: {
            notEmpty: true
        }
    }
})

module.exports = {
    Model
}