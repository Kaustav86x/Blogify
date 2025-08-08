const express = require('express')
// const requireAuth = require('../middleware/requireAuth')
const {SignUp, login, verifySignUp, forgetPassword, resetPassword} = require('../controllers/userController')
const { protect } = require('../middleware/requireAuth')
const upload = require('../utility/upload')

const router = express.Router()

//middlewire
// router.use(requireAuth)

// routes
router.post('/signup', upload.single('profilePicture'), SignUp)
router.post('/login', login)
router.post('/forget-password', protect, forgetPassword)
router.post('/verify-user/:token', protect, verifySignUp)
router.post('/reset-password/:token', protect, resetPassword)

module.exports = router