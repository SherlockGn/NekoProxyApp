import { host } from './host'
import { base64 } from './b64'

import router from '../router'
import fakeRpc from '../demo/fakeRpc'

const invoke = async (module, func, args) => {
    const isLogin = module === 'user' && func === 'login' && args.length === 2
    const auth = isLogin
        ? 'basic ' + base64(`${args[0]}:${args[1]}`)
        : 'bearer ' + (localStorage.getItem('token') ?? '')
    const res = await fetch(host + '/api/rpc', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': auth
        },
        body: JSON.stringify({
            module,
            func,
            args
        })
    })
    if (res.status === 401) {
        router.push({ name: 'Login' })
        throw new Error('login failed')
    }
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
        const obj = JSON.parse(resString)
        if (isLogin) {
            localStorage.setItem('token', obj.token)
        }
        return obj
    } catch {
        return resString
    }
}

const proxyPrc = new Proxy(
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

export const rpc = demoMode ? fakeRpc : proxyPrc

window.rpc = rpc
