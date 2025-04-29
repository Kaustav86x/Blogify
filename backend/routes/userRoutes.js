const express = require('express')
// const requireAuth = require('../middleware/requireAuth')
const {SignUp, login, verifySignUp, forgetPassword, resetPassword} = require('../controllers/userController')
const { protect } = require('../middleware/requireAuth')
const upload = require('../utility/upload')

const router = express.Router()

//middlewire
// router.use(requireAuth)

// routes
router.post('/api/signup', upload.single('profilePicture'), SignUp)
router.post('/api/login', login)
router.post('/api/forget-password', protect, forgetPassword)
router.post('/api/verify-user/:token', protect, verifySignUp)
router.post('/api/reset-password/:token', protect, resetPassword)

module.exports = router