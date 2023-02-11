//dependencies
const lib = require("../../lib/data")
const { hash, parseJSON } = require('../../helper/utilities')

// module scaffolding
const handler = {}
handler.userHandler = (requestProperties, callback) => {
    const acceptedMethods = ['get', 'post', 'put', 'patch', 'delete']
    if (acceptedMethods.indexOf(requestProperties.methods) > -1) {
        handler._users[requestProperties.methods](requestProperties, callback)
    }
    else {
        callback(405, {
            "error": "Its not a accepted routes"
        })
    }

}

handler._users = {}
handler._users.post = (requestProperties, callback) => {
    const firstName = typeof requestProperties.body.firstName === 'string' && requestProperties.body.firstName.trim().length > 0 ? requestProperties.body.firstName : false
    const lastName = typeof requestProperties.body.lastName === 'string' && requestProperties.body.lastName.trim().length > 0 ? requestProperties.body.lastName : false
    const phone = typeof requestProperties.body.phone === 'string' && requestProperties.body.phone.trim().length === 11 ? requestProperties.body.phone : false
    const password = typeof requestProperties.body.password === 'string' && requestProperties.body.password.length > 0 ? requestProperties.body.password : false

    const tosAgree = typeof requestProperties.body.tosAgree === 'boolean' && requestProperties.body.tosAgree.trim().length > true ? requestProperties.body.tosAgree : false

    if (firstName && lastName && phone && password && tosAgree) {
        //make sure that the user doesn't already exist  // read users file in .data folder
        lib.read('users', phone, (err1, user) => {
            if (err1) {
                // create a user object
                const userObject = {
                    firstName, lastName, phone, tosAgree, password: hash(password)
                }
                // create user to db
                lib.create('users', phone, userObject, (err2) => {
                    if (err2) {
                        callback(200, {
                            message: 'User was created successfullly'
                        })
                    }
                    else {
                        callback(500, {
                            error: 'Could not create a user'
                        })
                    }
                })
            }
            else {
                callback(500, {
                    error: "There was a problen in server side"
                })
            }
        })
    }



}
handler._users.get = (requestProperties, callback) => {
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
handler._users.put = (requestProperties, callback) => {
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
// handler._users.patch = (requestProperties, callback) => {

// }

handler._users.delete = (requestProperties, callback) => {
    const phone = typeof requestProperties.queryStringObject.phone === 'string' && requestProperties.queryStringObject.phone.trim().length === 11 ? requestProperties.queryStringObject.phone : false
    if (phone) {
        //    lookup the user  by data.read
        data.read('users', phone, (err, uData) => {
            const userData = { ...parseJSON(uData) }
            if (!err && userData) {
                //delete the user from db by data.delete method 
                data.delete('users', phone, (err) => {
                    if (!err) {

                    }
                    else {

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