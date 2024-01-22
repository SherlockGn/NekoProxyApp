const now = new Date().toJSON()

const logs = [
    {
        'id': 6,
        'name': 'Share my file',
        'command': 'git pull',
        'trigger': 'github',
        'output':
            '{"remoteMessages":{"all":[]},"created":[],"deleted":[],"files":[],"deletions":{},"insertions":{},"summary":{"changes":10,"deletions":2,"insertions":0}}',
        'error': null,
        'duration': 800,
        'createdAt': now,
        'updatedAt': now
    },
    {
        'id': 5,
        'name': 'Mahjong app',
        'command': 'git pull',
        'trigger': 'manual',
        'output':
            '{"remoteMessages":{"all":[]},"created":[],"deleted":[],"files":[],"deletions":{},"insertions":{},"summary":{"changes":0,"deletions":0,"insertions":0}}',
        'error': null,
        'duration': 631,
        'createdAt': now,
        'updatedAt': now
    },
    {
        'id': 4,
        'name': 'Mahjong app',
        'command': 'git checkout',
        'trigger': 'init',
        'output': "Your branch is up to date with 'origin/master'.\n",
        'error': null,
        'duration': 26,
        'createdAt': now,
        'updatedAt': now
    },
    {
        'id': 3,
        'name': 'Mahjong app',
        'command': 'git clone',
        'trigger': 'init',
        'output': '',
        'error': null,
        'duration': 1954,
        'createdAt': now,
        'updatedAt': now
    },
    {
        'id': 2,
        'name': 'Share my file',
        'command': 'npm install',
        'trigger': 'init',
        'output': null,
        'error': null,
        'duration': 147727,
        'createdAt': now,
        'updatedAt': now
    },
    {
        'id': 1,
        'name': 'Share my file',
        'command': 'git clone',
        'trigger': 'init',
        'output': '',
        'error': null,
        'duration': 4680,
        'createdAt': now,
        'updatedAt': now
    }
]

const get = (timerange, keyword, offset, limit) => {
    let lg = [...logs]
    if (timerange) {
        lg = lg.filter(
            item =>
                new Date(item.createdAt) >= new Date(timerange[0]) &&
                new Date(item.createdAt) <= new Date(timerange[1])
        )
    }
    if (keyword) {
        keyword = keyword.toLowerCase()
        lg = lg.filter(
            item =>
                item.name?.toLowerCase()?.includes(keyword) ||
                item.command?.toLowerCase()?.includes(keyword) ||
                item.trigger?.toLowerCase()?.includes(keyword) ||
                item.output?.toLowerCase()?.includes(keyword) ||
                item.error?.toLowerCase()?.includes(keyword)
        )
    }
    const count = lg.length
    return {
        data: lg.slice(offset, offset + limit),
        count
    }
}

const clear = () => {
    logs.splice(0, logs.length)
}

export default {
    get,
    clear
}
