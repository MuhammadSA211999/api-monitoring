// dependencise
const url = require("url")
const fs = require("fs")
const { StringDecoder } = require("string_decoder")
const routes = require("../routes")
const { notFoundHandler } = require("../handler/routesHandlers/notFoundHandler")
// file scaffolding
const handler = {}

handler.handleReqRes = (req, res) => {
    // console.log(routes);

    const parsedUrl = url.parse(req.url, true)
    const path = parsedUrl.pathname
    const trimmedPath = path.replace(/^\/+|\/+$/g, "")

    const queryStringObj = parsedUrl.query
    console.log(queryStringObj);
    // console.log(url);




    const method = req.method.toLowerCase()
    const headersObject = req.headers
    console.log(headersObject);
    const requestProperties = {
        parsedUrl, path, trimmedPath, queryStringObj, method, headersObject
    }
    const decoder = new StringDecoder("utf-8")
    let realData = ""
    const choseenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler

    choseenHandler(requestProperties, (statusCode, payload) => {
        statusCode = typeof (statusCode) === "number" ? statusCode : 500
        payload = typeof (payload) === "object" ? payload : {}
        const payloadString = JSON.stringify(payload)
        res.writeHead(statusCode)
        res.end(payloadString)
    })
    req.on("data", (buffer) => {
        realData += decoder.write(buffer)
    })
    req.on("end", () => {
        realData += decoder.end()
        choseenHandler(requestProperties, (statusCode, payload) => {
            statusCode = typeof (statusCode) === "number" ? statusCode : 500
            payload = typeof (payload) === "object" ? payload : {}
            const payloadString = JSON.stringify(payload)
            res.writeHead(statusCode)
            res.end(payloadString)
        })
        console.log(realData);
        res.end("This is a RAW NODE JS PROJECTS on API MONOTORING")
    })

}

module.exports = handler