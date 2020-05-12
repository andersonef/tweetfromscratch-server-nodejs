const tweet_repository = require('../repositories/tweet_repository')
const response = require('../helpers/response')
const validateAccessToken = require('../helpers/validate_access_token')

module.exports = {
    uri: '/tweets',
    method: 'GET',
    controller(request) {
        validateAccessToken(request)
        return response(tweet_repository.all())
    }
}