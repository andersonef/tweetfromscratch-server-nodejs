require('colors')
const fs = require('fs')

function loadRoutes() {    
    const controllers = []
    const files = fs.readdirSync('./src/controllers')
    files.forEach((file) => {
        const controller = require(`./controllers/${file}`)
        if (!controller.uri || !controller.method || !controller.controller) {
            return
        }
        controllers.push(controller)
    })
    console.log(`[ROUTE-LOADER] ${controllers.length} controllers loaded`)
    
    function getController (uri, method) {
        const controller = controllers
            .find((controller) => {
                return ((controller.uri  == uri || uri.match(controller.uri)) && controller.method == method)
            })
        if (!controller) {
            throw new Error('404 Not found!')
        }
        return controller.controller
    }

    console.log('[ROUTE-LOADER] Available Endpoints: '.yellow)
    controllers.forEach((controller) => {
        console.log('\t', controller.method.green, controller.uri.green)
    })

    return {
        getController
    }
}
module.exports = loadRoutes