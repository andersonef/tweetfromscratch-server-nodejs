const user_repository = require('../repositories/user_repository')
const response = require('../helpers/response')

function validateRequest(data) {
    if (!data
        || !data.name
        || !data.email
        || !data.password) {
            throw new Error('Check your request. Empty field(s)')
        }
    
    if (!data.email.match(/^[A-z,0-9,\.,\-,\_]{1,}@[A-z,0-9,\.,\-,\_]{2,}\.[A-z,0-9]{1,}$/)) {
        throw new Error('Invalid email')
    }

    const existent = user_repository.findByEmail(data.email)
    if (existent) {
        throw new Error('Email address already in use')
    }
}

module.exports = {
    uri: '/register',
    method: 'POST',
    controller(request) {
        validateRequest(request.body)
        const user = user_repository.create({
            name: request.body.name,
            email: request.body.email,
            password: request.body.password
        })
        return response(user)
    }
}