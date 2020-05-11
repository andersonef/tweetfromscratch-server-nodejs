const httpConfig = require('../config/http')

function response(rawResponse, success = true) {
    if (success) {
        return {
            statusCode: httpConfig.HTTP_STATUS_OK,
            status: 'success',
            data: rawResponse
        }
    }
    return {
        statusCode: httpConfig.HTTP_STATUS_FAIL,
        status: 'error',
        message:  rawResponse.message || rawResponse
    }
}
module.exports = response