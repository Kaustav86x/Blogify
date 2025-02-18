const User = require('../models/userSchema')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const validator = require('validator')
const multer = require('multer') // middlewire for handling file uploads
const path = require('path')
const helper = require('../utility/helper')
const { console } = require('inspector')
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')

// using Multer to store media in local
// const picStorage = multer.diskStorage({
//     destination: "./uploads/profile_pics",
//     filename: (req,file,cb) => {
//         cb(null, `${Date.now()}${path.extname(file.originalname)}`)
//     }
// }

// using cloudinary to store media in cloud
// configure cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET_KEY
})

// const picStorage = new CloudinaryStorage({
//     cloudinary: cloudinary.config,
//     params: {
//         folder: "userProfilePics",
//         allowed_formats: ["jpg","png","jpeg","webp"],
//     },
// })

// const upload = multer ({storage: picStorage})

const SignUp = async(req, res) => {

    // only the profilepicture field is getting involved
    // upload.single("profilePicture") async(req,res) => {
        
    const {name, email, password} = req.body

    let profilePicture = null

    try {  
        
        if(req.file) {
            const result = await helper.uploadToCloudinary(req.file, "userProfilePics");
            //res.json({ imageUrl: result.secure_url }); // Return Cloudinary image URL
            profilePicture = result.secure_url // set profile picture url
        }

        const mail = await User.findOne({email})

        if(mail) {
            throw Error('User already exists')
        }

        if(!validator.isEmail(email)) {
            throw Error('Email is not valid')
        }

        if(!validator.isStrongPassword(password)) {
            throw Error('Password is not strong')
        }

        // hashing the password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password,salt)

        // returning the user along with the profilepicture
        const user = await User.create({email, password: hash, name, profilePicture: profPic})
        console.log(user)

        // token without expiration time
        const token = helper.createToken(user._id)

        // update the existing userSchema values
        await User.findByIdAndUpdate(user._id, {verifyToken: token})

        // user verification
        var link = `http://localhost:8080/verify-user/${token}` 

        helper.verificationMailForSignUp(user,link)

        res.status(200).json({user,token})
    }
        catch (error) {
            res.status(400).json({error: error.message}) 
        }
    }

const verifySignUp = async(req,res) => {

    // fetching the token from the parameter
    const {token} = req.params

    try {
        // fetching the user from the token
        const user = await User.findOne({verifyToken: token})

        if(!user){
            throw Error('Token is invalid')
        }
        else {
            user.verifyStatus = true
            user.save()
        }
        res.status(200).json({user})
    }
    catch (error) {
        res.status(400).json({error: error.message})    
    }
}

const login = async(req,res) => {

    const {email, password} = req.body

    try {
        if(!email || !password) {
            throw Error('Email and password are required')
        }

        const user = await User.findOne({email})

        if(!user){
            throw Error('Email not found!')
        }
        if(user.verifyStatus === false) {
            throw Error('Email not verified!')
        }
        
        const match = await bcrypt.compare(password, user.password)
        if(!match){
            throw Error('Password is incorrect!')
        }

        const token = helper.createToken(user._id)
        
        res.status(200).json({user, token})
    }
    catch(error) {
        res.status(400).json({error: error.message})
    }
}

const forgetPassword = async(req,res) => {

    const {email} = req.body
    var token = ''
     
    try {
        if(!email) {
            throw Error('Email is required')
        }
        
        const user = await User.findOne({email})

        if(!user) {
            throw Error('Email not found!')
        }

        else {
            // token with expiration time
            token = helper.createToken_time(user._id)
            const hash_token = crypto.createHash('sha256').update(token).digest('hex')
            // new hash_token and with and without expiration time have been added and the user has been updated.
            await User.findByIdAndUpdate(user._id, {passwordResetToken: hash_token, passwordResetTokenExpire: Date.now() + 20 * 60 * 1000})
        }

        var link = `http://localhost:8080/reset-password/${token}`

        helper.verificationMailForResetPassword(user,link)
    }
    catch(err)
    {
        res.status(400).json({error: err.message})
    }
}

const resetPassword = async(req,res) => {
    const {token} = req.params
    const{password} = req.body

    try {

        const hash_token = crypto.createHash('sha256').update(token).digest('hex')
        const user = await User.findOne({passwordResetToken: hash_token, passwordResetTokenExpire:{$gt: Date.now()}})

        if(!user) {
            throw Error('Token has either expired or is invalid!')
        }

        else {
            user.passwordResetToken = undefined
            user.passwordResetTokenExpire = undefined
            user.passwordUpdateDate = Date.now()

            if(!validator.isStrongPassword(password)) {
                throw Error('Password is not strong')
            }

            // updating the user with new password
            const salt = await bcrypt.genSalt()
            const hash = await bcrypt.hash(password, salt)
            user.password = hash
            await user.save()
        }

        res.status(200).json({user})
    }
    catch(error) {
        res.status(400).json({error: error.message})
    }
}

 
module.exports = {SignUp, verifySignUp, login, forgetPassword, resetPassword}