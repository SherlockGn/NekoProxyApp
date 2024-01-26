const now = new Date().toJSON()

const jobs = [
    {
        'id': 1,
        'name': 'Hello world',
        'description': 'Hi everyone!',
        'enabled': false,
        'cron': '0 * * * * *',
        'script': "    console.log('Hello world!')",
        'createdAt': now,
        'updatedAt': now
    },
    {
        'id': 2,
        'name': 'Animechan',
        'description': 'A free restful API serving quality anime quotes',
        'enabled': true,
        'cron': '* 0 * * * *',
        'script':
            "    const rsp = await fetch('https://animechan.xyz/api/random')\n    return await rsp.text()",
        'createdAt': now,
        'updatedAt': now
    }
]

const add = job => {
    job.id = jobs.length + 1
    job.createdAt = new Date().toJSON()
    job.updatedAt = new Date().toJSON()
    jobs.push(job)
}

const get = () => {
    const ret = [...jobs]
    ret.forEach(item => {
        item.status = item.enabled ? 'online' : 'stopped'
    })
    return ret
}

const getById = id => jobs.find(r => r.id === Number(id))

const update = (id, job) => {
    const r = jobs.find(r => r.id === Number(id))
    if (r) {
        for (const k in job) {
            r[k] = job[k]
        }
        r.updatedAt = new Date().toJSON()
    }
}

const del = id => {
    const i = jobs.findIndex(r => r.id === Number(id))
    if (i > -1) {
        jobs.splice(i, 1)
    }
}

const start = id => {}

export default {
    add,
    get,
    update,
    getById,
    del,
    start
}
