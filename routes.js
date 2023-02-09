// dependencicse
const { notFoundHandler } = require("./handler/routesHandlers/notFoundHandler")
const { sampleHandler } = require("./handler/routesHandlers/sampleHandler")
//module scaffholding
const routes = {
    sample: sampleHandler,

}

module.exports = routes