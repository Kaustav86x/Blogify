const mongoose = require('mongoose')

const Schema = mongoose.Schema

const blogSchema = new Schema({
  BlogId: {
    type: String,
    default: uuidv4,
    unique: true
  },
  title: { 
    type: String, 
    required: true 
  },
  content: { 
    type: String, 
    required: true 
  },
  author: { 
    type: String, 
    required: true 
  },
  likes: { 
    type: Number, default: 0 
  },
  tags: {
    type: Array,
    required: true
  },
  category: {
    type: String,
    required: true
  }
},{timestamps:true})

module.exports = mongoose.model('Blog', blogSchema);
