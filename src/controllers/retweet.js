const response = require('../helpers/response')
const validateAccessToken = require('../helpers/validate_access_token')
const appConfig = require('../config/app')
const tweet_repository = require('../repositories/tweet_repository')

/**
 * Rules: 
 *  - I can't retweet my own tweets
 *  - I can't retweet the same tweet twice
 */
module.exports = {
    uri: '/retweet/%',
    method: 'POST',
    controller(request) {
        const user = validateAccessToken(request)
        validateRequest(request.body)
        
        const tweet_id = request.url.split('/retweet/')[1]
        const tweet = tweet_repository.find(tweet_id)

        if (!tweet) {
            throw new Error('Tweet not found')
        }
        if (tweet.user_id === user.id) {
            throw new Error('You can not retweet your own tweets.')
        }
        if (tweet_repository.findRetwited(tweet_id, user.id)) {
            throw new Error('You can not retweet the same tweet twice.')
        }
        const newTweetData = {
            parent_id: tweet.id,
            user_id: user.id,
            message: request.body.message
        }
        const newTweet = tweet_repository.create(newTweetData)
        return response(newTweet)
    }
}

function validateRequest(request) {
    if (!request.message) {
        return true
    }
    if (request.message.length > appConfig.TWEET_MAX_SIZE) {
        throw new Error('Your message length exceeded the maximum allowed size')
    }
}