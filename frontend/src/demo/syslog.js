const now = new Date().toJSON()

const logs = [
    {
        'id': 28,
        'type': 'string',
        'level': 'info',
        'content': 'Updated 1 router stacks.',
        'createdAt': now,
        'updatedAt': now
    },
    {
        'id': 29,
        'type': 'object',
        'level': 'info',
        'content': '{"portsToOpen":[],"portsToClose":[]}',
        'createdAt': now,
        'updatedAt': now
    },
    {
        'id': 27,
        'type': 'string',
        'level': 'info',
        'content': 'Proxy server (8888) started successfully.',
        'createdAt': now,
        'updatedAt': now
    },
    {
        'id': 26,
        'type': 'object',
        'level': 'info',
        'content': '{"portsToOpen":[8888],"portsToClose":[]}',
        'createdAt': now,
        'updatedAt': now
    },
    {
        'id': 25,
        'type': 'string',
        'level': 'info',
        'content': 'Updated 1 router stacks.',
        'createdAt': now,
        'updatedAt': now
    },
    {
        'id': 24,
        'type': 'object',
        'level': 'info',
        'content':
            '{"message":"Server started on http://localhost:3334","config":{"port":3334,"database":{"dialect":"sqlite","host":null,"username":null,"password":null},"login":{"required":true,"expiresIn":"2h"},"enableCORS":true},"dir":"/Users/tianheg/Coding/neko-proxy-app/service","process":{"pid":89997,"ppid":44919,"platform":"darwin","args":["/usr/local/bin/node","/Users/tianheg/Coding/neko-proxy-app/main.js"]}}',
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
        lg = lg.filter(item => item.content?.toLowerCase().includes(keyword))
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
