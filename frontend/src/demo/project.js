import pm from './pm'

const now = new Date().toJSON()

const projects = [
    {
        'id': 1,
        'name': 'Share my file',
        'description': 'Displays all files of your server, port 3000',
        'type': 'NodeServer',
        'port': null,
        'script': 'main.js',
        'args': '',
        'repo': 'https://gitee.com/NekoGong/share-my-file.git',
        'branch': null,
        'createdAt': now,
        'updatedAt': now
    },
    {
        'id': 2,
        'name': 'Mahjong app',
        'description': 'A great Mahjong helper!',
        'type': 'Static',
        'port': 8080,
        'script': null,
        'args': null,
        'repo': 'https://gitee.com/NekoGong/riichi-mahjong-helper.git',
        'branch': null,
        'createdAt': now,
        'updatedAt': now
    }
]

const add = async project => {
    project.id = projects.length + 1
    project.createdAt = new Date().toJSON()
    project.updatedAt = new Date().toJSON()
    await new Promise(resolve => setTimeout(resolve, 3000))
    projects.push(project)
}

const get = () => {
    const projs = JSON.parse(JSON.stringify(projects))
    const processes = pm.get()
    projs.forEach(p => {
        const pmProject = processes.find(item => item.name === p.name)
        p.status = pmProject ? pmProject.pm2_env.status : 'unknown'
    })
    return projs
}

const getById = id => {
    return projects.find(p => p.id === Number(id))
}

const update = (id, project) => {
    const r = projects.find(r => r.id === Number(id))
    if (r) {
        for (const k in project) {
            r[k] = project[k]
        }
        r.updatedAt = new Date().toJSON()
    }
}

const del = id => {
    const i = projects.findIndex(r => r.id === Number(id))
    if (i > -1) {
        projects.splice(i, 1)
    }
}

const start = id => {
    pm.start(getById(id))
}

const pull = id => {}

export default {
    add,
    get,
    getById,
    update,
    start,
    pull,
    del
}
