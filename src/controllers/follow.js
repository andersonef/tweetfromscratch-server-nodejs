const response = require('../helpers/response')
const validateAccessToken = require('../helpers/validate_access_token')

const user_repository = require('../repositories/user_repository')
const connection_repository = require('../repositories/connection_repository')

module.exports = {
    uri: '/follow/%',
    method: 'POST',
    controller(request) {
        const followerUser = validateAccessToken(request)
        const followingUser = user_repository.find(+request.url.split('/follow/')[1])
        const connection = connection_repository.create(followerUser, followingUser)
        
        return response(connection)
    }
}