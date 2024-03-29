const invoke = async (module, func, args, context) => {
    const reg = /^[a-zA-Z]+$/
    if (!reg.test(module) || !reg.test(func)) {
        throw Error('Invalid module or function name')
    }
    const mo = require(`./${module}`)
    const f = mo[func]

    return await f.apply(context, args)
}

module.exports = {
    invoke
}
