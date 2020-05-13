const response = require('../helpers/response')
const validateAccessToken = require('../helpers/validate_access_token')

const user_repository = require('../repositories/user_repository')
const connection_repository = require('../repositories/connection_repository')

module.exports = {
    uri: '/unfollow/%',
    method: 'DELETE',
    controller(request) {
        const user = validateAccessToken(request)
        const following_user_id = request.url.split('/unfollow/')[1]
        const following_user = user_repository.find(following_user_id)
        if (!following_user) {
            throw new Error('User not found!')
        }
        connection_repository.delete(user.id, following_user_id)
        return response(true)
    }
}