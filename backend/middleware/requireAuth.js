const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const { UserModel } = require('../models/userSchema')

const protect = asyncHandler(async(req, res, next) => {
    // authorization header from request header
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.SECRET)
            req.user = await UserModel.findById(decoded.id).select('-password')
            next();
        }
        catch(error) {
            res.status(401)
            throw new Error(error.message || 'Not authorized, token failed')
        }
    }

    if(!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

module.exports = { protect }