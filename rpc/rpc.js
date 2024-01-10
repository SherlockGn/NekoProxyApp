const invoke = async (module, func, args) => {
    const regexIsAllAlpha = /^[a-zA-Z]+$/
    if (!regexIsAllAlpha.test(module) || !regexIsAllAlpha.test(func)) {
        throw Error('Invalid module or function name')
    }
    const mo = require(`./${module}`)
    const f = mo[func]

    return await f.apply(null, args)
}

module.exports = {
    invoke
}