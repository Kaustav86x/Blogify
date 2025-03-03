const Blog = require('../models/blogSchema')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const validator = require('validator')
const helper = require('../utility/helper')

const createBlog = async(req, res) => {

    const { title, mainContent, subHeadings, userId, tags } = req.body
    console.log(req.body)

    try { 
        const findTitle = await Blog.findOne({title})

        // if(findTitle)
        //     throw Error('Blog with this title already exists!')

        // creating a new blog
        const newBlog = await Blog.create({
            title, 
            mainContent: mainContent || "",
            subHeadings: subHeadings || [],
            userId, 
            tags
        })

        res.status(200).json({ message: "Blog created successfully!", newBlog })
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}

const getAllBlog = async(req, res) => {

    try {
        const blogs = await Blog.find()
        console.log(blogs)
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
        // returning the updated blog
        res.status(200).json(updateBlog)
    }
    catch(error) {
        res.status(400).json({error: error.message})
    }
}

const deleteBlogbyId = async(req,res) => {
    const {id} = req.params
    try {
        const deleteBlog = await Blog.findByIdAndDelete(id)
        if(!deleteBlog)
            throw Error('Blog not found!')
        res.status(200).json(deleteBlog)
     }
     catch(error) {
        res.status(400).json({error: error.message})
     }
}

const mostLikedBlog = async(req,res) => {
    // const {likes} = req.body
    try {
        //sorting the likes in descending order
        const popularBlog = await Blog.findOne().sort({ likes:-1 }).exec()
        if(!popularBlog)
            throw Error('No blog found!')

        res.status(200).json(popularBlog)
    }
    catch(error) {
        res.status(400).json({error: error.message})
    }
}



module.exports = {createBlog,getAllBlog,getBlogById,updateBlogById,deleteBlogbyId,mostLikedBlog}