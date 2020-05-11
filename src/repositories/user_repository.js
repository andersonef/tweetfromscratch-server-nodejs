const users = []
module.exports = {

    all() {
        return users
    },

    authenticate(email, password) {
        return users.find((user) => {
            return (user.email === email && user.password === password)
        })
    },

    find(id) {
        return users.find((user) => {
            return (user.id === id)
        })
    },

    findByEmail(email) {
        return users.find((user) => {
            return (user.email === email)
        })
    },

    create(newUser) {
        const existent = this.findByEmail(newUser.email)
        if (existent) {
            throw new Error('There is already an user with this email address')
        }
        newUser.id = Date.now()
        users.push(newUser)
        return newUser
    }
}