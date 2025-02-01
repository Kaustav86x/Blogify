const mongoose = require('mongoose')
const { type } = require('os')

const Schema = mongoose.Schema

const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    verifyToken:{
        type: String
    },
    verifyStatus:{
        type:Boolean,
    }
},{timestamps:true})

module.exports = mongoose.model('User',userSchema)