//dependencies
const lib = require("../../lib/data")
const { hash, parseJSON, createRandomString } = require('../../helper/utilities')

// module scaffolding
const handler = {}
handler.tokenHandler = (requestProperties, callback) => {
    const acceptedMethods = ['get', 'post', 'put', 'patch', 'delete']
    if (acceptedMethods.indexOf(requestProperties.methods) > -1) {
        handler._token[requestProperties.methods](requestProperties, callback)
    }
    else {
        callback(405, {
            "error": "Its not a accepted routes"
        })
    }

}

handler._token = {}
handler._token.post = (requestProperties, callback) => {

    const phone = typeof requestProperties.body.phone === 'string' && requestProperties.body.phone.trim().length === 11 ? requestProperties.body.phone : false
    const password = typeof requestProperties.body.password === 'string' && requestProperties.body.password.length > 0 ? requestProperties.body.password : false
    if (phone && password) {
        // lookup the users 
        data.read('users', phone, (err1, uData) => {
            const userData = { ...parseJSON(uData) }
            if (hash(password) === userData.password) {
                const tokenId = createRandomString(20)
                let expires = Date.now() + 60 * 60 * 1000
                const tokenObject = {
                    phone,
                    id: tokenId,
                    expires
                }
                // store the token on db by data.create method
                data.create('tokens', tokenId, tokenObject, (err2) => {
                    if (!err2) {
                        callback(200, {
                            message: 'successfully created the token'
                        })
                    }
                    else {
                        callback(500, {
                            error: 'cuold not create the token'
                        })
                    }
                })

            }
            else {
                callback(400, {
                    error: 'can not matched'
                })
            }
        })
    }
    else {
        callback(500, {
            error: 'Invalid user'
        })
    }

}

handler._token.get = (requestProperties, callback) => {
    const id = typeof requestProperties.queryStringObject.id === 'string' && requestProperties.queryStringObject.id.length === 20 ? requestProperties.queryStringObject.id : false
    if (id) {
        data.read('tokens', id, (err1, token) => {
            const parsToken = { ...parseJSON(token) }

            if (!err1) {
                callback(200, {
                    token: parsToken
                })
            }
            else {
                callback(500, {
                    error: 'server doesnot found the token'
                })
            }
        })
    }
    else {
        callback(400, {
            error: 'Need a valid id'
        })
    }
}
handler._token.put = (requestProperties, callback) => {
    const id = typeof requestProperties.body.id === 'string' ? requestProperties.body.token : false
    const extend = typeof requestProperties.body.extend === 'boolean' && requestProperties.body.extend === true ? requestProperties.body.extend : false
    if (id && extend) {
        data.read('tokens', id, (err1, token) => {
            let tokenObj = { ...parseJSON(token) }
            if (!err1) {
                if (tokenObj.expires > Date.now()) {
                    tokenObj.expires = Date.now() + 60 * 60 * 1000
                    data.update('tokens', id, tokenObj, (err) => {
                        if (!err) {
                            callback(200, {
                                message: 'successfully update the token'
                            })
                        }
                        else {
                            callback(500, {
                                error: 'Server side error'
                            })
                        }
                    })
                }
                else {
                    callback(400, {
                        error: 'Token has time'
                    })
                }
            }
            else {

            }
        })
    }
    else {

    }
}
handler._token.delete = (requestProperties, callback) => {
    const id = typeof requestProperties.queryStringObject.id === 'string' && requestProperties.queryStringObject.id.trim().length === 11 ? requestProperties.queryStringObject.phone : false
    if (id) {
        //    lookup the user  by data.read
        data.read('tokens', id, (err, token) => {
            const parseToken = { ...parseJSON(token) }
            if (!err && parseToken) {
                //delete the user from db by data.delete method 
                data.delete('tokens', id, (err) => {
                    if (!err) {
                        callback(200, {
                            message: 'successfully delete the token'
                        })
                    }
                    else {
                        callback(400, {
                            error: 'there was server side error'
                        })
                    }
                })
            }
            else {
                callback(400, {
                    error: 'there was a sever side error'
                })
            }
        })
    }
    else {
        callback(500, {
            error: 'Please give a unique token number'
        })
    }
}

handler._token.verifyToken = (id, phone, callback) => {
    if (id && phone) {
        data.read('tokens', id, (err, tokenData) => {
            if (!err && tokenData) {
                const parseToken = { ...parseJSON(tokenData) }
                if (parseToken.id === id && parseToken.expires > Date.now()) {
                    callback(true)
                }
                else {
                    callback(false)
                }
            }
            else {
                callback(false)
            }
        })
    }
    else {
        callback(false)
    }

}


module.exports = handler