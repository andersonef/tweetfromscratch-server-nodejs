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
                if (request.method === 'OPTIONS') {
                    parseOptionsRequest(response)
                    return
                }
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
            console.log('[SERVER] New request: ', request.method,  request.url)
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

    function parseOptionsRequest(response) {
        console.log('[SERVER] Parsing OPTIONS request');
        var headers = {};
        headers["Access-Control-Allow-Origin"] = "*";
        headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
        headers["Access-Control-Allow-Credentials"] = true;
        headers["Access-Control-Max-Age"] = '86400'; // 24 hours
        headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization";
        response.writeHead(200, headers);
        response.end();
    }

    return {
        start
    }
}

module.exports = createServer