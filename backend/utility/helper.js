const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const {Resend} = require('resend')
const multer = require('multer')

// instatiation of resend
const resendInstance = new Resend(process.env.RESEND_API_KEY)

// jwttoken fucntion with expiration time
const createToken_time = function(_id) {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn:'20m'})
}

// jwttoken fucntion without expiration time
const createToken = function(_id) {
    return jwt.sign({_id}, process.env.SECRET)
}

function verificationMailForSignUp (user,link) {

    const {name, email}  = user

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
        to: email, // Receiver
        subject: "Hello from Blogify",
        html: `<html>
        <head>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet">
        </head>
        <body style="font-family: 'Poppins', sans-serif; text-align: center; padding: 20px; background: #f9f9f9;">
        
            <div style="max-width: 500px; margin: auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <h2 style="color: #9333ea;">Welcome to Blogify, ${name}!</h2>
                <p style="font-size: 16px; color: #333;">
                    You're just one step away from unlocking the full experience.  
                    Click the button below to verify your email and get started!
                </p>
            
                <a href="${link}" style="text-decoration: none;">
                    <button style="border-radius: 7px; background: #9333ea; color: white; width: 12rem; height: 2.5rem; 
                        border: none; font-weight: bold; font-size: 16px; cursor: pointer; margin: 15px 0;">
                        Verify Email
                    </button>
                </a>
                <p style="font-size: 14px; color: #666;">
                    Didn’t sign up? No worries! Simply ignore this email.  
                </p>
                <p style="font-size: 12px; color: #aaa;">Happy Blogging!</p>
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
}

function verificationMailForResetPassword (user,link) {

    const {name, email}  = user

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
        to: email, // Receiver
        subject: "Password Reset",
        html: `<html>
            <head>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet">
            </head>
            <body>
            <p><span>Hi ${name},</span></p>
            <p><span>Someone recently requested a password change for your Blogify account.<br/>If it was you, 
            you can reset your password here:</span></p>
            <a href="${link}"><button style="border-radius: 7px; background: #9333ea; color: white; width: 10rem; height: 2rem; 
            border: none; font-weight: bold; font-size: 16px; cursor: pointer">Reset Password</button></a>
            <p>The link is valid for only 20 minutes.</p>
            </body>
            </html>`
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
      } else {
            console.log("Email sent:", info.response);
        }
        });
}
// unused
function verificationMailforSignUp_resend() {
            resendInstance.emails.send({
                from: 'deyk905@gmail.com',
                to: user.email,
                subject: 'Verify your email address',
                html: `<html>
                <head>
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet">
                </head>
                <body>
                <p><span>Hi ${user.name},</span></p>
                <p><span>Welcome to Blogify. Please Verify your email here:</span></p>
                <a href="${link}"><button style="border-radius: 7px; background: #9333ea; 
                color: white; width: 10rem; height: 2rem; border: none; font-weight: bold; 
                font-size: 16px; cursor: pointer">Verify Email</button></a>
                <p>If you have not Signed up, just ignore and delete this message.
                </body>
                </html>`
            })
}
// unused
function verificationMailforResetPassword_resend() {
    resendInstance.emails.send({
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

// upload files to cloudinary
const uploadToCloudinary = async (file, folder) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(file.buffer);
    });
  };


// stetting storage engine
const storage = multer.memoryStorage()

//initializing upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024}, // 2MB max file size
    fileFilter: function (req, res, cb) {
        checkFileType(file, cb)
    }
}).fields([{ name: 'image', maxCount: 1}])  

// checking file type
function checkFileType(file, cb) {
    // allowed extensions
    const fileTypes = /jpeg|jpg|png|/
    //check extension 
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())

    if(extname) {
        return cb(null, true)
    }
    else {
        cb('Error: Only Image files are accepted !')
    }
}

module.exports = {createToken,createToken_time,verificationMailForSignUp,verificationMailForResetPassword,uploadToCloudinary,upload}