const { DataTypes } = require('sequelize')

const { connection } = require('./database')

const Property = connection.define('property', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [Object.keys(DataTypes).filter(i => i === i.toUpperCase())]
        }
    },
    defaultValue: {
        type: DataTypes.STRING,
        allowNull: true
    },
    allowNull: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    unique: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    validate: {
        type: DataTypes.TEXT
    }
})

module.exports = {
    Property
}