const response = require('../helpers/response')
const user_repository = require('../repositories/user_repository')
const validateAccessToken = require('../helpers/validate_access_token')

module.exports = {
    uri: '/me',
    method: 'GET',
    controller(request) {
        const user = validateAccessToken(request)
        return response(user)
    }
}