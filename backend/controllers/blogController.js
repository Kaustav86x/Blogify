const Blog = require('../models/blogSchema')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const validator = require('validator')
const helper = require('../utility/helper')

const createBlog = async(req, res) => {

    const { title, content, userId, likes, tags } = req.body

    try { 
        const findTitle = await Blog.findOne({title})

        if(findTitle)
            throw Error('Blog with this title already exists!')

        // creating a new blog
        const blog = await Blog.create({title, content, userId, likes, tags})

        res.status(200).json({blog})
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}

const getAllBlog = async(req, res) => {

    try {
        const blogs = await Blog.find()
        res.status(200).json(blogs)
    }
    catch(error) {
        res.status(400).json({error: error.message})
    }
}

const getBlogById = async(req, res) => {

    const {id} = req.params
    
    try {
        const blog = await Blog.findById(id)
        if(!blog)
            throw Error('Blog not found!')
        res.status(200).json(blog)
    }
    catch(error) {
        res.status(400).json({error: error.message})
    }
        
}

const updateBlogById = async(req,res) => {

    const {id} = req.params
    //const {title,content,userId,likes,tags} = req.body

    try {
        const updateBlog = await Blog.findByIdAndUpdate(id,req.body, {new:true})
        if(!updateBlog) {
            throw Error('Blog not found!')
        }
        res.status(200).json(updateBlog)
    }
    catch(error) {
        res.status(400).json({error: error.message})
    }
}

const deleteBlogbyId = async(req,res) => {
    const {id} = req.params
    try {
        const deleteBlog = Blog.findByIdAndDelete(id)
        if(!deleteBlog)
            throw Error('Blog not found!')
        res.status(200).json({message:"Deleted blog - "},deleteBlog)
     }
     catch(error) {
        res.status(400).json({error: error.message})
     }
}

module.exports = {createBlog,getAllBlog,getBlogById,updateBlogById,deleteBlogbyId}