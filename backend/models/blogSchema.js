const mongoose = require('mongoose')

const Schema = mongoose.Schema
const {Types} = mongoose

const subHeadingSchema = new Schema({
  title: { type: String, required: true } // Subheading title
});

const blogSchema = new Schema({
  title: { 
    type: String, 
    required: true 
  },
  mainContent: { 
    type: String,
  },
  subHeadings: {
    type: [subHeadingSchema],
    validate: [arr => arr.length <= 10, "Can't have more than 10 subheadings"]
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
  },
  content: {
  type: Object, // Stores the Editor.js output (JSON)
  required: true
}

},{timestamps:true})

module.exports = mongoose.model('Blog', blogSchema);
