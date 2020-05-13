const createServer = require('./server.js')
const httpConfig = require('./config/http')

const server = createServer({
    port: process.env.port || httpConfig.HTTP_PORT,
    hostname: 'localhost'
})

server.start()