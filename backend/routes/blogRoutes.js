const express = require('express')
const requireAuth = require('../middleware/requireAuth')
const {createBlog,getAllBlog,getBlogById,updateBlogById,deleteBlogbyId,mostLikedBlog} = require('../controllers/blogController')

const router = express.Router()

// router.use(requireAuth)

// routes
router.post('/create', createBlog)
router.get('/all', getAllBlog)
router.get('/find/:id', getBlogById)
router.put('/update/:id', updateBlogById)
router.delete('/delete/:id', deleteBlogbyId)
router.get('/most-liked', mostLikedBlog)

module.exports = router