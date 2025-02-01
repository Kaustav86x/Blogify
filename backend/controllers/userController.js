const User = require('../models/userSchema')
const bcrypt = require('bcrypt')
const validator = require('validator')
const helper = require('../utility/helper')

const SignUp = async(req, res) => {

    const {name, email, password} = req.body

    try {
        // validating the input payload
        if(!email || !password || !name) {
            throw Error('All fields must be filled')
        }

        const mail = await User.findOne({email})

        if(mail) {
            throw Error('User already exists')
        }

        if(!validator.isEmail(email)) {
            throw Error('Email is not valid')
        }

        if(!validator.isStrongPassword(email)) {
            throw Error('Password is not strong')
        }

        // hashing the password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password,salt)

        const user = await User.create({email, password: hash, name})

        const token = helper.createToken(user._id)

        await User.findByIdAndUpdate(user._id, {verifyToken: token, verifyStatus: false})
        
        res.status(200).json({user,token})
    }
        
        catch (error) {
            res.status(400).json({error: error.message})
        }
    }

const verifySignUp = async(req,res) => {

    const {token} = req.body

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
        
        res.status(200).json({user, token, status: false})
    }
    catch(error) {
        res.status(400).json({error: error.message})
    }
}



module.exports = {SignUp, verifySignUp, login}