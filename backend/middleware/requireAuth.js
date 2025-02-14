const jwt = require('jsonwebtoken')
const blog = require('../controllers/blogController')

const requireAuth = async (req,res,next) => {
    // authorization header from request header
    const { authorization } = req.headers

    if(!authorization) {
        return res.status(401).json({error:'Authorization token required !'})
    }

    // extracting the jwt token
    const { token } = authorization.split(' ')[1]

    try {
        const {_id} = jwt.verify(token, process.env.SECRET)

        // only the id form the DB will get fetchedr
        req.user = await blog.findOne({_id}).select('_id')
        next()
    }
    catch(error) {
        res.status(401).json({error:'Request is not authorized'})
    }
}

module.exports = requireAuth