const { DataTypes } = require('sequelize')

const { connection } = require('./database')

const User = connection.define('user', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
        validate: {
            notEmpty: true
        }
    }
})

module.exports = {
    User
}
