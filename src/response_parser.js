const httpConfig = require('./config/http.js')

/**
 * This function try to parse the raw response from the controller into http.ServerResponse.
 * 
 * @param {*} rawResponse Response from controller. It must be a jsonable object or the client will get a fail response
 * @param {http.ServerResponse} httpResponse Server Response to write on.
 */
function responseParser(rawResponse, httpResponse) {
    httpResponse.setHeader('Content-type', 'application/json')
    httpResponse.statusCode = rawResponse.statusCode || httpConfig.HTTP_STATUS_FAIL
    try {
        delete rawResponse.statusCode
        httpResponse.write(JSON.stringify(rawResponse))
    } catch (e) {
        httpResponse.statusCode = httpConfig.HTTP_STATUS_FAIL
        httpResponse.write(JSON.stringify({
            status
        }))
        console.log('[RESPONSE-PARSER] Could not format response into JSON')
    }
    httpResponse.end()
}
module.exports = responseParser