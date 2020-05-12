function createServer(config = {}) {
    const http = require('http')
    
    function start() {
        console.log('[SERVER] Starting server...')
        const loadRoutes = require('./route_loader.js')
        const parseResponse = require('./response_parser.js')
        const responseInterface = require('./helpers/response.js')
        const routes = loadRoutes()
        const port = config.port || 3000

        const onServerDone = (request, response) => {
            try {
                
                request.body = (request.body) ? JSON.parse(request.body) : null
                const controller = routes.getController(request.url, request.method)
                
                const controllerResponse = controller(request)
                parseResponse(controllerResponse, response)
            } catch (e) {
                console.log('[SERVER] Failure: ', e)
                return parseResponse(responseInterface(e, false), response)
            }
        }
        
        const server = http.createServer((request, response) => {   
            let body = ''
            console.log('[SERVER] New request: ', request.url)
            request.on('data', (chunk) => {
                body += chunk
            })
            request.on('end', () => {
                request.body = body
                onServerDone(request, response)
            })
            
        })

        
        server.listen(port, config.hostname || 'localhost', () => {
            console.log(`[SERVER] Server running on port ${port}...`)
        })
    }

    return {
        start
    }
}

module.exports = createServer