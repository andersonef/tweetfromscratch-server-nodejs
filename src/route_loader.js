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
        return controllers
            .find((controller) => {
                return (controller.uri == uri && controller.method == method)
            })
            .controller
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