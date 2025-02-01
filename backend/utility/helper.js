const jwt = require('jsonwebtoken')

// jwttoken fucntion with expiration time
const createToken_time = function(_id) {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn:'20m'})
}

// jwttoken fucntion without expiration time
const createToken = function(_id) {
    return jwt.sign({_id}, process.env.SECRET)
}

module.exports = {createToken,createToken_time}