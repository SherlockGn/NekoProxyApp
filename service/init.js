const { connection } = require('../db/database')

const { User } = require('../db/user')
const { GlobalSetting } = require('../db/globalSetting')
const { ApiLog } = require('../db/apiLog')
const { ProxyLog } = require('../db/proxyLog')
const { Rule } = require('../db/rule')
const { SystemLog } = require('../db/systemLog')
const { Model } = require('../db/model')
const { Property } = require('../db/property')
const { Rest } = require('../db/rest')
const { RestLog } = require('../db/restLog')
const { Project } = require('../db/project')
const { ProjectLog } = require('../db/projectLog')
const { Job } = require('../db/job')
const { JobLog } = require('../db/jobLog')

const { createDefault } = require('./user')
const { initJobs } = require('./job')

const init = async () => {
    Rule.hasMany(ProxyLog)
    ProxyLog.belongsTo(Rule)

    Model.hasMany(Property, { onDelete: 'cascade' })
    Property.belongsTo(Model)

    Model.hasOne(Rest, { onDelete: 'cascade' })
    Rest.belongsTo(Model)

    await connection.sync({ alter: { drop: false } })

    if (
        (await GlobalSetting.findOne({ where: { name: 'pk' } })) === null ||
        (await User.count()) === 0
    ) {
        await createDefault()
    }

    await initJobs()
}

module.exports = {
    init
}
