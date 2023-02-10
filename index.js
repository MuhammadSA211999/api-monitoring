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
//testeng file system for create , read, update and delete
//TODO pore muche dite hobe
// create data from here
// data.create("test", "newFile4", { name: "sa", country: "bd" }, (err) => {
//     console.log("error was", err);
// })

//read data from here
// data.read("test", "newFile", (err, data) => {
//     console.log("read file system error =>", err, "data is =>", data);

// })

// update the existing file from here
data.update('test', 'newFile', { "name": "saleh", "country": "Afganistan" }, (err) => {
    console.log(err);

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