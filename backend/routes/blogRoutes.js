const express = require('express')
const {createBlog,getAllBlog,getBlogById,updateBlogById,deleteBlogbyId} = require('../controllers/blogController')

const router = express.Router()

// routes
router.post('/create', createBlog)
router.get('/all', getAllBlog)
router.get('/:id', getBlogById)
router.put('/update/:id', updateBlogById)
router.delete('/delete/:id', deleteBlogbyId)

module.exports = router