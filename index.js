/*
API Monitoring projects
RESTfull api monotore up and down api
*/
const http = require("http")
const fs = require("fs")
const { StringDecoder } = require("string_decoder")

// app scaffolding 
const app = {}
//app  config scaffolding 
app.config = {
    port: 5000
}

//craete server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes)
    server.listen(app.config.port, () => {
        console.log(`SERVER IS RUNNING ON PORT ${app.config.port}`);
    })
}

app.handleReqRes = (req, res) => {
    req.on("data", (buffer) => {

    })
    res.end("This is a RAW NODE JS PROJECTS on API MONOTORING")
}

app.createServer()