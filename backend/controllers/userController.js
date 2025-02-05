const User = require('../models/userSchema')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const validator = require('validator')
const helper = require('../utility/helper')
const {Resend} = require('resend')
const nodemailer = require('nodemailer')

// resend instantiation 
const resendInstance = new Resend(process.env.RESEND_API_KEY)

const SignUp = async(req, res) => {

    const {name, email, password} = req.body

    try {   

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

        const user = await User.create({email, password: hash, name})

        // token without expiration time
        const token = helper.createToken(user._id)

        // update the existing userSchema values
        await User.findByIdAndUpdate(user._id, {verifyToken: token})

        // user verification
        var link = `http://localhost:8080/verify-user/${token}`


    // Create a transporter object
    const transporter = nodemailer.createTransport({
    service: "gmail", // Or use 'smtp.ethereal.email' for testing
    auth: {
        user: "deyk905@gmail.com", // Replace with your Gmail
        pass: process.env.NODEMAILER_PASSWORD  // Use App Password (not your real password)
        },
    });

    // Email options
    const mailOptions = {
    from: "deyk905@gmail.com", // Sender
    to: user.email, // Receiver
    subject: "Hello from Blogify",
    html: `<html>
<head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet">
</head>
<body style="font-family: 'Poppins', sans-serif; text-align: center; padding: 20px; background: #f9f9f9;">
    
    <div style="max-width: 500px; margin: auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #9333ea;">Welcome to Blogify, ${user.name}! 🎉</h2>
        <p style="font-size: 16px; color: #333;">
            You're just one step away from unlocking the full experience.  
            Click the button below to verify your email and get started!
        </p>
        
        <a href="${link}" style="text-decoration: none;">
            <button style="border-radius: 7px; background: #9333ea; color: white; width: 12rem; height: 2.5rem; 
                border: none; font-weight: bold; font-size: 16px; cursor: pointer; margin: 15px 0;">
                ✅ Verify Email
            </button>
        </a>

        <p style="font-size: 14px; color: #666;">
            Didn’t sign up? No worries! Simply ignore this email.  
        </p>
        
        <p style="font-size: 12px; color: #aaa;">Happy Blogging! ✨</p>
    </div>
</body>
</html>
`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error("Error sending email:", error);
  } else {
        console.log("Email sent:", info.response);
    }
    });


        // sending signup verification mail
        // await resendInstance.emails.send({
        //     from: 'deyk905@gmail.com',
        //     to: user.email,
        //     subject: 'Verify your email address',
        //     html: `<html>
        //     <head>
        //     <link rel="preconnect" href="https://fonts.googleapis.com">
        //     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        //     <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet">
        //     </head>
        //     <body>
        //     <p><span>Hi ${user.name},</span></p>
        //     <p><span>Welcome to Blogify. Please Verify your email here:</span></p>
        //     <a href="${link}"><button style="border-radius: 7px; background: #9333ea; 
        //     color: white; width: 10rem; height: 2rem; border: none; font-weight: bold; 
        //     font-size: 16px; cursor: pointer">Verify Email</button></a>
        //     <p>If you have not Signed up, just ignore and delete this message.
        //     </body>
        //     </html>`
        // })

        res.status(200).json({user,token,})
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

        // sending mail for password reset
        await resendInstance.emails.send({
            from: 'deyk905@gmail.com',
            to: 'deyk905@gmail.com',
            subject: 'Password Reset',
            html: `<html>
            <head>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet">
            </head>
            <body>
            <p><span>Hi ${user.name},</span></p>
            <p><span>Someone recently requested a password change for your Blogify account.<br/>If it was you, 
            you can reset your password here:</span></p>
            <a href="${link}"><button style="border-radius: 7px; background: #9333ea; color: white; width: 10rem; height: 2rem; 
            border: none; font-weight: bold; font-size: 16px; cursor: pointer">Reset Password</button></a>
            <p>The link is valid for only 20 minutes.</p>
            </body>
            </html>`
        })
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