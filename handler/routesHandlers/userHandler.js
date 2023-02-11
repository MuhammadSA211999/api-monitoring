//dependencies
const lib = require("../../lib/data")
const { hash } = require('../../helper/utilities')

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
    callback(200, {
        "message": "successfully get user route"
    })
}
handler._users.put = (requestProperties, callback) => {

}
handler._users.patch = (requestProperties, callback) => {

}

handler._users.delete = (requestProperties, callback) => {

}
handler._users.patch = (requestProperties, callback) => {

}

module.exports = handler