const { init } = require('./service/init')

const { start } = require('./service/app')
const { refreshProxies } = require('./service/gateway')

const main = async () => {
    await init()
    await start()
    await refreshProxies()

    const { Op, DataTypes } = require('sequelize')
}

main()