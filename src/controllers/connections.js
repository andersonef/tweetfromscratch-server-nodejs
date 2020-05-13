const response = require('../helpers/response')
const connection_repository = require('../repositories/connection_repository')

module.exports = {
    uri: '/connections',
    method: 'GET',
    controller(request) {
        return response(connection_repository.all())
    }
}