const mongoose = require('mongoose')

const Schema = mongoose.Schema
const {Types} = mongoose

const blogSchema = new Schema({
  title: { 
    type: String, 
    required: true 
  },
  content: { 
    type: String, 
    required: true 
  },
  userId: {
    type: Types.ObjectId, ref: "User", 
    required: true
  },
  likes: { 
    type: Number, 
    default: 0
  },
  tags: {
    type: Array,
    required: true
  }
},{timestamps:true})

module.exports = mongoose.model('Blog', blogSchema);
