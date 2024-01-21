const { createUser, update } = require('../service/user')

module.exports = {
    create: createUser,
    login() {
        return this.auth.user
    },
    update(password) {
        return update(this.auth.user.id, password)
    }
}
