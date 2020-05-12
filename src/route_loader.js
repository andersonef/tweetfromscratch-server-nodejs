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
                let pattern = controller.uri + '$'
                if (controller.uri.substr(-1) == '%') {
                    // If controller's route ends with %, I'll accept /controllers-route/[any alphanumeric]
                    pattern = controller.uri.replace('%', '[A-z,0-9]{1,}$')
                }
                return (uri.match(pattern) && controller.method == method)
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