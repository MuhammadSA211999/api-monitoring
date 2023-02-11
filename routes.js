// dependencicse
const { notFoundHandler } = require("./handler/routesHandlers/notFoundHandler")
const { sampleHandler } = require("./handler/routesHandlers/sampleHandler")
const { userHandler } = require("./handler/routesHandlers/userHandler")
//module scaffholding
const routes = {
    sample: sampleHandler,
    user: userHandler
}

module.exports = routes

