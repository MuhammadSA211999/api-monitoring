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
utilities.createRandomString = (length) => {
    return 'dnggurgbr'
}

module.exports = utilities