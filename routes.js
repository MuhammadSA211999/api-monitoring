// dependencicse
const { notFoundHandler } = require("./handler/routesHandlers/notFoundHandler")
const { sampleHandler } = require("./handler/routesHandlers/sampleHandler")
const { tokenHandler } = require("./handler/routesHandlers/tokenHandler")
const { userHandler } = require("./handler/routesHandlers/userHandler")
//module scaffholding
const routes = {
    sample: sampleHandler,
    user: userHandler,
    // notFound: notFoundHandler
    token: tokenHandler
}

module.exports = routes

