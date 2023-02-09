/*
API Monitoring projects
RESTfull api monotore up and down api
*/
const http = require("http")
const fs = require("fs")
const { StringDecoder } = require("string_decoder")
const { handleReqRes } = require("./helper/handleReqRes")
const environments = require("./helper/environments")
const data = require("./lib/data")
// app scaffolding 
const app = {}
//testeng file system 
//TODO pore muche dite hobe
data.create("test", "newFile3", { name: "sa", country: "bd" }, (err) => {
    console.log("error was", err);

})
//craete server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes)
    server.listen(environments.port, () => {
        console.log("envishbsb", environments);
        console.log(`SERVER IS RUNNING ON PORT ${environments.port}`);
    })
}

app.handleReqRes = handleReqRes

app.createServer()