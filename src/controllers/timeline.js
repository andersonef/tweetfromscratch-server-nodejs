const response = require('../helpers/response')
const validateAccessToken = require('../helpers/validate_access_token')
const tweet_repository = require('../repositories/tweet_repository')
const connection_repository = require('../repositories/connection_repository')

module.exports = {
    uri: '/timeline',
    method: 'GET',
    controller(request) {
        const user = validateAccessToken(request)
        const users_i_follow = connection_repository.getFollowing(user.id)
        const my_tweets = tweet_repository.fromUsers(
            users_i_follow.map((follower) => {
                return follower.id
            })
        )
        return response(my_tweets)
    }
}