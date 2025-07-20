const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    userName: {
        type: String,
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    profilePicture : {
        url:  { type: String },
        id: { type: String }
    },
    passwordResetToken: {
        type: String
    },
    passwordResetTokenExpire: {
        type: Date
    },
    passwordUpdateDate: {
        type: Date
    },
    verifyToken:{
        type: String
    },
    audiobookConversions: {
        type: Number,
        default: 0
    }

},{timestamps:true})

module.exports = mongoose.model('User',userSchema)