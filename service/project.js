const pm2 = require('pm2')
const { join } = require('path')
const fs = require('fs')
const { exec } = require('child_process')

const simpleGit = require('simple-git')
const readLastLines = require('read-last-lines')
const { Op } = require('sequelize')

const { connection } = require('../db/database')
const { Project } = require('../db/project')
const { ProjectLog } = require('../db/projectLog')

const base = join(__dirname, '..', 'runtime', 'repo')
const logBase = join(__dirname, '..', 'runtime', 'repologs')

const getPath = proj => {
    const parts = proj.repo.replace('.git', '').split('/')
    const gitName = parts[parts.length - 1]
    const projectPath = join(base, gitName)
    const logPath = join(logBase, `${proj.name}.log`)

    return {
        projectPath,
        logPath
    }
}

const doWithLog = async (action, name, command, trigger) => {
    let start = new Date()
    let ret
    try {
        ret = await action()
        if (typeof ret !== 'string') {
            ret = JSON.stringify(ret)
        }
        await ProjectLog.create({
            name,
            command,
            trigger,
            output: ret,
            duration: new Date() - start
        })
        return ret
    } catch (error) {
        await ProjectLog.create({
            name,
            command,
            trigger,
            error: error.message,
            duration: new Date() - start
        })
        throw error
    }
}

const getProjects = async () => {
    const projects = (await Project.findAll()).map(p => p.dataValues)
    const pm = await get()
    projects.forEach(p => {
        const { projectPath } = getPath(p)
        const pmProject = pm.find(item => item.pm2_env.cwd === projectPath)
        p.status = pmProject ? pmProject.pm2_env.status : 'unknown'
    })

    return projects
}

const getProjectById = async id => {
    return await Project.findByPk(id)
}

const createProject = async proj => {
    await doWithLog(
        async () => await clone(proj.repo),
        proj.name,
        'git clone',
        'init'
    )

    const { projectPath } = getPath(proj)

    try {
        if (proj.branch !== null) {
            await doWithLog(
                async () => await checkout(projectPath, proj.branch),
                proj.name,
                'git checkout',
                'init'
            )
        }

        if (proj.type === 'NodeServer') {
            await doWithLog(
                async () => await install(projectPath),
                proj.name,
                'npm install',
                'init'
            )
        }
    } catch (error) {
        if (fs.existsSync(projectPath)) {
            fs.rmSync(projectPath, { recursive: true, force: true })
        }
        throw error
    }

    return await Project.create(proj)
}

const startProject = async id => {
    const p = await Project.findByPk(id)
    if (!p) {
        return
    }
    const { projectPath } = getPath(p)
    const pmProject = (await get()).find(
        item => item.pm2_env.cwd === projectPath
    )
    if (pmProject) {
        return await restart(pmProject.pm_id)
    }
    return await start(p)
}

const updateProject = async (id, proj) => {
    return await Project.update(proj, { where: { id } })
}

const deleteProject = async id => {
    const p = await Project.findByPk(id)
    if (!p) {
        return
    }
    const { projectPath } = getPath(p)
    const pmProject = (await get()).find(
        item => item.pm2_env.cwd === projectPath
    )
    if (pmProject) {
        await del(pmProject.pm_id)
    }
    fs.rmSync(projectPath, { recursive: true, force: true })
    return await Project.destroy({ where: { id } })
}

const pullProject = async (id, trigger = 'manual') => {
    const p = await Project.findByPk(id)
    if (!p) {
        return
    }
    const { projectPath } = getPath(p)
    const pmProject = (await get()).find(
        item => item.pm2_env.cwd === projectPath
    )
    if (pmProject) {
        await stop(pmProject.pm_id)
    }
    await doWithLog(
        async () => await pull(projectPath),
        p.name,
        'git pull',
        trigger
    )
    if (p.type === 'NodeServer') {
        await doWithLog(
            async () => await install(projectPath),
            p.name,
            'npm install',
            trigger
        )
    }
    if (pmProject) {
        await restart(pmProject.pm_id)
    }
}

const pullProjectAuto = async (gitServer, gitName) => {
    const p = await Project.findOne({
        where: {
            repo: {
                [Op.endsWith]: `/${gitName}.git`,
                [Op.substring]: `/${gitServer}.com/`
            }
        }
    })

    if (p) {
        return await pullProject(p.id, gitServer)
    }
}

const clone = async repo => {
    if (!fs.existsSync(base)) {
        fs.mkdirSync(base, { recursive: true })
    }

    const git = simpleGit({ baseDir: base })
    return await git.clone(repo)
}

const checkout = async (dir, branch) => {
    const git = simpleGit({ baseDir: dir })
    return await git.checkout(branch)
}

const pull = async dir => {
    const git = simpleGit({ baseDir: dir })
    return await git.pull()
}

const install = async dir => {
    await new Promise((resolve, reject) => {
        exec(
            'npm install',
            {
                cwd: dir
            },
            (err, stdout, stderr) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve(stdout)
            }
        )
    })
}

// PM

const start = async project => {
    let { name, type, port, script, args } = project
    const { projectPath, logPath } = getPath(project)

    if (type === 'Static') {
        script = 'serve'
        args = `${projectPath} ${port} 0.0.0.0`
    }

    return await new Promise((resolve, reject) => {
        pm2.start(
            {
                script,
                args,
                name: name,
                cwd: projectPath,
                log_file: logPath
            },
            (err, data) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve(data)
            }
        )
    })
}

const stop = async id => {
    return await new Promise((resolve, reject) => {
        pm2.stop(id, (err, data) => {
            if (err) {
                reject(err)
                return
            }
            resolve(data)
        })
    })
}

const restart = async id => {
    return await new Promise((resolve, reject) => {
        pm2.restart(id, (err, data) => {
            if (err) {
                reject(err)
                return
            }
            resolve(data)
        })
    })
}

const get = async () => {
    return await new Promise((resolve, reject) => {
        pm2.list((err, data) => {
            if (err) {
                reject(err)
                return
            }
            resolve(data)
        })
    })
}

const del = async id => {
    return await new Promise((resolve, reject) => {
        pm2.delete(id, (err, data) => {
            if (err) {
                reject(err)
                return
            }
            resolve(data)
        })
    })
}

const getLog = async (id, line) => {
    const proj = (await get()).find(proj => proj.pm_id === id)
    if (!proj) {
        throw new Error('id not exists')
    }
    const logPath = proj.pm2_env.pm_log_path
    try {
        return await readLastLines.read(logPath, line, 'utf-8')
    } catch (error) {
        return ''
    }
}

module.exports = {
    getProjects,
    getProjectById,
    createProject,
    startProject,
    updateProject,
    pullProject,
    pullProjectAuto,
    deleteProject,

    get,
    start,
    restart,
    stop,
    del,
    getLog
}
