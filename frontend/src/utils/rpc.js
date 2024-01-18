import { host } from './host'

const invoke = async (module, func, args) => {
    const res = await fetch(host + '/api/rpc', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            module,
            func,
            args
        })
    })
    if (res.status > 300) {
        let errorMsg = ''
        try {
            errorMsg = (await res.json()).error
            if (!errorMsg) {
                throw new Error()
            }
        } catch {
            errorMsg = 'unknow error occurs'
        }
        throw new Error(errorMsg)
    }
    const resString = await res.text()
    if (resString.length === 0) {
        return undefined
    }
    try {
        return JSON.parse(resString)
    } catch {
        return resString
    }
}

export const rpc = new Proxy(
    {},
    {
        get: (target, module) => {
            return new Proxy(
                {},
                {
                    get: (target, func) => {
                        return (...args) => invoke(module, func, args)
                    }
                }
            )
        }
    }
)

window.rpc = rpc
