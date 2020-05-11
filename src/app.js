const createServer = require('./server.js')
const server = createServer({
    port: process.env.port || 3000,
    hostname: 'localhost'
})

server.start()