const { CronJob, sendAt } = require('cron')
const { v4 } = require('uuid')

const { Job } = require('../db/job')
const { JobLog } = require('../db/jobLog')

const { join, resolve } = require('path')
const fs = require('fs')
const { Readable } = require('stream')
const { finished } = require('stream/promises')

const jobs = []

const getFunctionByStringContent = (params, content) => {
    const string = `async (${params.join(', ')}) => {
${content}
}`
    return Function(`return ${string}`)()
}

const isCronValid = cron => {
    try {
        return sendAt(cron).toISO()
    } catch {
        return ''
    }
}

const objectToString = obj => {
    if (typeof obj === 'object') {
        return JSON.stringify(obj)
    }
    if (obj === undefined || obj === null) {
        return obj
    }
    return obj.toString()
}

const download = async (url, path) => {
    const folder = resolve(path, '..')
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true })
    }
    const res = await fetch(url)
    const fstream = fs.createWriteStream(path, { flags: 'wx' })
    await finished(Readable.fromWeb(res.body).pipe(fstream))
}

const utils = name => {
    return {
        require,
        join,
        download,
        v4,
        folder: resolve(__dirname, '../runtime/jobs', name)
    }
}

const startJob = async job => {
    const transaction = v4()
    const start = new Date()
    await JobLog.create({
        transaction,
        name: job.name,
        status: 'start'
    })
    let output, error
    try {
        const func = getFunctionByStringContent(['utils'], job.script)
        output = await func(utils(job.name))
    } catch (err) {
        error = err.message
    }
    await JobLog.create({
        transaction,
        name: job.name,
        status: 'end',
        output: objectToString(output),
        error: objectToString(error),
        duration: new Date() - start
    })
}

const refreshJob = job => {
    const j = jobs.find(item => item.id === job.id)
    if (j) {
        j.job.stop()
        jobs.splice(jobs.indexOf(j), 1)
    }

    if (!job.cron || !job.enabled) {
        return
    }

    const newJob = CronJob.from({
        cronTime: job.cron,
        onTick: async () => {
            await startJob(job)
        },
        start: true
    })

    jobs.push({
        id: job.id,
        job: newJob
    })
}

const createJob = async job => {
    const ret = await Job.create(job)
    refreshJob(ret)

    return ret
}

const updateJob = async (id, job) => {
    const ret = await Job.update(job, {
        where: { id }
    })
    refreshJob(await Job.findByPk(id))

    return ret
}

const queryJobs = async () => {
    const queried = (await Job.findAll()).map(j => j.dataValues)
    queried.forEach(j => {
        j.status = jobs.some(item => item.id === j.id) ? 'online' : 'stopped'
    })
    return queried
}

const queryJobByPk = async id => {
    return await Job.findByPk(id)
}

const delJob = async id => {
    const ret = await Job.destroy({
        where: { id }
    })
    refreshJob({ id })
    return ret
}

const initJobs = async () => {
    const jobs = await queryJobs({
        where: {
            enabled: true
        }
    })
    jobs.forEach(refreshJob)
}

module.exports = {
    createJob,
    updateJob,
    queryJobs,
    queryJobByPk,
    startJob,
    delJob,
    initJobs,
    isCronValid
}
