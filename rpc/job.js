const {
    queryJobs,
    queryJobByPk,
    createJob,
    updateJob,
    delJob,
    startJob,
    isCronValid
} = require('../service/job')

module.exports = {
    add: createJob,
    get: queryJobs,
    getById: queryJobByPk,
    update: updateJob,
    start: startJob,
    del: delJob,
    validate: isCronValid
}
