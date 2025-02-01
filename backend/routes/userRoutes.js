const express = require('express')
const {SignIn} = require('../controllers/userController')

const router = express.Router()

// routes
router.post('/signin', SignIn)
router.post('/login', () => {})
router.post('/forget-password',() => {})
router.post('/verify-user/:token',() => {})
router.post('/reset-password/:token',()=>{})

module.exports = router