/*
API Monitoring projects
RESTfull api monotore up and down api
*/
const http = require("http")
const fs = require("fs")
const { StringDecoder } = require("string_decoder")
const { handleReqRes } = require("./helper/handleReqRes")
const environments = require("./helper/environments")
// app scaffolding 
const app = {}
//app  config scaffolding 

//craete server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes)
    server.listen(environments.port, () => {
        console.log(`SERVER IS RUNNING ON PORT ${environments.port}`);
    })
}

app.handleReqRes = handleReqRes

app.createServer()