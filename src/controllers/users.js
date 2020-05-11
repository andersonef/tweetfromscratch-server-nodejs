const response = require('../helpers/response')
const user_repository = require('../repositories/user_repository')

module.exports = {
    uri: '/users',
    method: 'GET',
    controller(request) {
        return response(user_repository.all())
    }
}