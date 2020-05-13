const response = require('../helpers/response')
const validateAccessToken = require('../helpers/validate_access_token')
const tweet_repository = require('../repositories/tweet_repository')

module.exports = {
    uri: '/tweets-from/%',
    method: 'GET',
    controller(request) {
        const user = validateAccessToken(request)
        const my_tweets = tweet_repository.fromUser([user.id])
        return response(my_tweets)
    }
}