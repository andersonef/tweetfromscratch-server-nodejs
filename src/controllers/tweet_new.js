const appConfig = require('../config/app')
const response = require('../helpers/response')
const tweet_repository = require('../repositories/tweet_repository')
const validateAccessToken = require('../helpers/validate_access_token')

module.exports = {
    uri: '/new-tweet',
    method: 'POST',
    controller(request) {
        const user = validateAccessToken(request)
        validateRequest(request.body)
        const tweet = tweet_repository.create({...request.body, user_id: user.id})
        return response({
            tweet
        })
    }
}

function validateRequest(request) {
    if (!request) {
        throw new Error('Invalid request')
    }
    if (!request.message) {
        throw new Error('Invalid tweet message')
    } 
    if (request.message.length > appConfig.TWEET_MAX_SIZE) {
        throw new Error('Your message length exceeded the maximum allowed size')
    }
}