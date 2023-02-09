const handler = {}
handler.notFoundHandler = (requestProperties, callback) => {
    callback(404, {
        error: "your request is invalid"
    })

}

module.exports = handler