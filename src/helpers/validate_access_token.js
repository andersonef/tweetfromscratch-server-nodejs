const access_token_repository = require('../repositories/access_token_repository')
const user_repository = require('../repositories/user_repository')

function validateAccessToken(request) {
    if (!request || !request.headers || !request.headers.authorization) {
        throw new Error('Access token not found. Please send it on the request headers this way: Authorization: Bearer <your-hash>')
    }
    const token = request.headers.authorization.split('Bearer ')
    if (token.length < 2) {
        throw new Error('Invalid Access Token')
    }
    const access_token = access_token_repository.validate(token[1])
    return user_repository.login(access_token.user_id)
}

module.exports = validateAccessToken