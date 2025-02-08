const Blog = require('../models/blogSchema')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const validator = require('validator')
const helper = require('../utility/helper')

const CreateBlog = async(req, res) => {

    const { title, content, author, likes, category, tags } = req.body

    try { 
        const findTitle = await Blog.findOne({title})

        if(findTitle)
            throw Error('Blog with this title already exists!')

        // creating a new blog
        const blog = await Blog.create({title, content, author, likes, category, tags})

        res.status(200).json({blog})
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}

const GetAllBlog = async(req, res) => {
    try {
        const blogs = await Blog.find()
        res.status(200).json(blogs)
    }
    catch(error) {
        res.status(400).json({error: error.message})
    }
}

const GetBlogById = async(req, res) => {

    const {Id} = req.params
    
    try {
        const blog = await Blog.findById(Id)
        if(!blog)
            throw Error('Blog not found!')
        res.status(200).json(blog)
    }
    catch(error) {
        res.status(400).json({error: error.message})
    }
        
}