const bcrypt = require('bcryptjs')
const { v4 } = require('uuid')
const jwt = require('jsonwebtoken')

const { User } = require('../db/user')
const { GlobalSetting } = require('../db/globalSetting')
const { expiresIn } = require('../config.json').login

const createUser = async (name, password) => {
    const saltRound = 10
    const salt = bcrypt.genSaltSync(saltRound)
    const hashed = bcrypt.hashSync(password, salt)

    const ret = await User.create({
        name,
        password: hashed,
        salt
    })
    delete ret.dataValues.password
    return ret.dataValues
}

let pk = null
const getPk = async () => {
    if (pk !== null) {
        return pk
    }
    const pkSetting = await GlobalSetting.findOne({ where: { name: 'pk' } })
    if (pkSetting === null) {
        pk = v4()
        await GlobalSetting.create({ name: 'pk', value: pk })
    } else {
        pk = pkSetting.value
    }
    return pk
}

const createDefault = async () => {
    await getPk()
    return await createUser('admin', 'admin')
}

const checkCredential = async (name, password) => {
    const user = await User.findOne({ where: { name } })
    if (!user) {
        throw new Error('user not found')
    }
    if (!bcrypt.compareSync(password, user.password)) {
        throw new Error('invalid password')
    }
    const token = jwt.sign({ id: user.id }, await getPk(), { expiresIn })
    return {
        id: user.id,
        name: user.name,
        token
    }
}

const checkToken = async token => {
    const { id } = jwt.verify(token, await getPk())
    return await User.findByPk(id, { attributes: { exclude: ['password'] } })
}

const check = async auth => {
    const parts = auth.split(' ')
    if (parts[0] && parts[0].toLowerCase() === 'basic') {
        const cre = Buffer.from(parts[1], 'base64').toString()
        return {
            user: await checkCredential(cre.split(':')[0], cre.split(':')[1]),
            type: 'basic'
        }
    }
    if (parts[0] && parts[0].toLowerCase() === 'bearer') {
        return {
            user: await checkToken(parts[1]),
            type: 'bearer'
        }
    }
}

const update = async (id, password) => {
    const saltRound = 10
    const salt = bcrypt.genSaltSync(saltRound)
    const hashed = bcrypt.hashSync(password, salt)

    return await User.update(
        {
            password: hashed
        },
        {
            where: { id }
        }
    )
}

module.exports = {
    createUser,
    createDefault,
    check,
    update
}
