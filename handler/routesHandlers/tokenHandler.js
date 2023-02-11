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
    const phone = typeof requestProperties.queryStringObject.phone === 'string' && requestProperties.queryStringObject.phone.length === 11 ? requestProperties.queryStringObject.phone : false
    if (phone) {
        // look up the user by data.read
        data.read('users', phone, (err, u) => {
            const user = { ...parseJSON(u) }
            if (!err && user) {
                callback(200, {
                    user: user
                })
            }
            else {
                callback(404, {
                    error: 'Something went wrong'
                })
            }
        })
    }
    else {
        callback(404, {
            error: 'requested user not found'
        })
    }
}
handler._token.put = (requestProperties, callback) => {
    const firstName = typeof requestProperties.body.firstName === 'string' && requestProperties.body.firstName.trim().length > 0 ? requestProperties.body.firstName : false
    const lastName = typeof requestProperties.body.lastName === 'string' && requestProperties.body.lastName.trim().length > 0 ? requestProperties.body.lastName : false
    const phone = typeof requestProperties.body.phone === 'string' && requestProperties.body.phone.trim().length === 11 ? requestProperties.body.phone : false
    const password = typeof requestProperties.body.password === 'string' && requestProperties.body.password.length > 0 ? requestProperties.body.password : false

    if (phone) {
        if (firstName || lastName || password) {
            //lookup the user file by data.read method
            data.read('users', phone, (err, uData) => {
                const userData = { ...parseJSON(uData) }
                if (!err && userData) {
                    if (firstName) {
                        userData.firstName = firstName
                    }
                    if (lastName) {
                        userData.lastName = lastName
                    }
                    if (password) {
                        userData.password = hash(password)
                    }
                    //  updating the user to db by data.update method
                    data.update('user', phone, userData, (err) => {
                        if (!err) {
                            callback(200, {
                                message: 'successfully update the user'
                            })
                        }
                        else {
                            callback(400, {
                                error: 'Something went wrong, can not update'
                            })
                        }
                    })
                }
                else {
                    callback(404, {
                        error: 'User was not found'
                    })
                }
            })
        }
        else {
            callback(400, {
                error: 'Must need a update field'
            })
        }
    }
    else {
        callback(400, {
            error: 'Your phone is not valid'
        })
    }
}
handler._token.delete = (requestProperties, callback) => {
    const phone = typeof requestProperties.queryStringObject.phone === 'string' && requestProperties.queryStringObject.phone.trim().length === 11 ? requestProperties.queryStringObject.phone : false
    if (phone) {
        //    lookup the user  by data.read
        data.read('users', phone, (err, uData) => {
            const userData = { ...parseJSON(uData) }
            if (!err && userData) {
                //delete the user from db by data.delete method 
                data.delete('users', phone, (err) => {
                    if (!err) {
                        callback(200, {
                            message: 'successfully delete the user'
                        })
                    }
                    else {
                        callback(400, {
                            error: 'there was aserver side error'
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
            error: 'Please give a unique i phone'
        })
    }
}


module.exports = handler