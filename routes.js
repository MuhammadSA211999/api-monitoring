// dependencicse
const { notFoundHandler } = require("./handler/routesHandlers/notFoundHandler")
const { sampleHandler } = require("./handler/routesHandlers/sampleHandler")
const { userHandler } = require("./handler/routesHandlers/userHandler")
//module scaffholding
const routes = {
    sample: sampleHandler,
    user: userHandler,
    notFound: notFoundHandler
}

module.exports = routes

