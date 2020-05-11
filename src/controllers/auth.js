const user_repository = require('../repositories/user_repository.js')
const access_token_repository = require('../repositories/access_token_repository')
const response = require('../helpers/response.js')

function validateRequest(request) {
    if (!request.email) {
        throw new Error('Email field not found.')
    }
    if (!request.password) {
        throw new Error('Password field not found.')
    }
}

module.exports = {
    uri: '/auth',
    method: 'POST',
    controller(request) {
        validateRequest(request.body)
        const user = user_repository.authenticate(request.body.email, request.body.password)
        if (!user) {
            throw new Error('Invalid credentials')
        }
        const token = access_token_repository.create(user.id)
        return response(token)
    }
}