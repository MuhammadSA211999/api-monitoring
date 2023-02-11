//module scaffolding 
const utilities = {}

// dependencies
const crypto = require('crypto')
const environments = require('./environments')

// functional coding
utilities.parseJSON = (jsonString) => {
    let output;
    try {
        output = JSON.parse(jsonString)
    }
    catch {
        output = {}
    }
    return output
}

utilities.hash = (str) => {
    if (typeof str === 'string' && str.length > 0) {
        const hash = crypto.createHmac('ysi457s',
            //  environments[process.env.NODE_ENV].secretKey
            'nhwrutylf'
        )
            .update(str)
            .digest('hex')
        return hash
    }
    return false
}
utilities.createRandomString = (strLength) => {
    let length = strLength
    length = typeof strLength === 'number' && strLength.length > 19 ? strLength : false
    if (length) {
        const possibleCharacter = 'abcdefghijklmnopqrstwxyz1234567890'
        let output = ''
        for (let i = 1; i <= length; i++) {
            const randomCharac = Math.floor(Math.random() * possibleCharacter.length)
            output += randomCharac
            return output
        }
        return false
    }
}

module.exports = utilities