const express = require('express')
const requireAuth = require('../middleware/requireAuth')
const {SignUp, login, verifySignUp, forgetPassword, resetPassword} = require('../controllers/userController')

const router = express.Router()

//middlewire
router.use(requireAuth)

// routes
router.post('/signup', SignUp)
router.post('/login', login)
router.post('/forget-password',forgetPassword)
router.post('/verify-user/:token', verifySignUp)
router.post('/reset-password/:token',resetPassword)

module.exports = router