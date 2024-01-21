const { DataTypes } = require('sequelize')

const { connection } = require('./database')

const GlobalSetting = connection.define('globalSetting', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    value: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

module.exports = {
    GlobalSetting
}
