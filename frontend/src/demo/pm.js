const now = new Date().toJSON()

const root = '/users/neko/coding/neko-proxy-app'

const processes = [
    {
        name: 'neko-proxy-app',
        pm2_env: {
            status: 'online',
            created_at: now,
            pm_uptime: now,
            pm_cwd: root,
            pm_exec_path: root + '/main.js',
            args: [''],
            pm_log_path: root + '/runtime/repologs/neko-proxy-app.log'
        },
        monit: {
            cpu: 5,
            memory: 1024
        },
        pm_id: 1,
        'createdAt': now,
        'updatedAt': now
    }
]

const getPath = proj => {
    const parts = proj.repo.replace('.git', '').split('/')
    const gitName = parts[parts.length - 1]
    const projectPath = root + '/runtime/repo/' + gitName
    const logPath = root + '/runtime/repologs/' + proj.name+ '.log'

    return {
        projectPath,
        logPath
    }
}

const start = project => {
    let { name, type, port, script, args } = project
    const { projectPath, logPath } = getPath(project)

    if (type === 'Static') {
        script = 'serve'
        args = `${projectPath} ${port} 0.0.0.0`
    } else {
        script = projectPath + '/' + script
    }

    processes.push({
        name,
        pm_id: processes.length + 1,
        monit: {
            cpu: 5,
            memory: 1024
        },
        pm2_env: 
            {
                status: 'online',
                created_at: new Date().toJSON(),
                pm_uptime: new Date().toJSON(),
                pm_cwd: projectPath,
                pm_exec_path: script,
                args: [args],
                pm_log_path: logPath,
            },
    })
}

const get = () => {
    return [...processes]
}

const stop = id => {
    const r = processes.find(p => p.pm_id === Number(id))
    if (r) {
        r.pm2_env.status = 'stopped'
        r.pm2_env.pm_uptime = new Date().toJSON()
    }
}

const restart = id => {
    const r = processes.find(p => p.pm_id === Number(id))
    if (r) {
        r.pm2_env.status = 'online'
        r.pm2_env.pm_uptime = new Date().toJSON()
    }
}

const del = id => {
    const i = processes.findIndex(r => r.pm_id === Number(id))
    if (i > -1) {
        processes.splice(i, 1)
    }
}

const getLog = (id, line) => {
    return `[2024-01-22 10:15:32] Job Started: Example Job
[2024-01-22 10:15:32] Initializing script execution...
[2024-01-22 10:15:33] Script execution started.
[2024-01-22 10:15:33] Running "run" function...
[2024-01-22 10:15:33] Using the provided "utils" parameter for enhanced functionality.
[2024-01-22 10:15:33] Invoking "require" to include necessary third-party tools.
[2024-01-22 10:15:34] Successfully included required third-party tools.
[2024-01-22 10:15:34] Combining file path using "join" function.
[2024-01-22 10:15:34] File path successfully combined.
[2024-01-22 10:15:35] Saving file to the specified folder: "runtime/jobs/example_job".
[2024-01-22 10:15:35] File saved successfully.
[2024-01-22 10:15:36] Calling the "download" function asynchronously.
[2024-01-22 10:15:38] File downloaded from the provided URL and saved to the specified path.
[2024-01-22 10:15:39] Generating a v4 UUID using the "v4" function.
[2024-01-22 10:15:39] UUID generated: "f4d6b1ab-8b99-4f3e-9e34-3b8c895e7a1c".
[2024-01-22 10:15:39] Logging the returned value and any errors thrown during the function call.
[2024-01-22 10:15:39] Script execution completed successfully.
[2024-01-22 10:15:39] Job Completed: Example Job
[2024-01-22 10:15:39] Total execution time: 7 seconds.
[2024-01-22 10:15:39] Log generated for job: "example_job".`
}

export default {
    get,
    start,
    restart,
    stop,
    del,
    getLog
}