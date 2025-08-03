const express = require('express')
const requireAuth = require('../middleware/requireAuth')
const {createBlog,getAllBlog,getBlogById,updateBlogById,deleteBlogbyId,mostLikedBlog, getBlogByName} = require('../controllers/blogController')

const router = express.Router()

// router.use(requireAuth)

// routes
// router.post('/create', createBlog)
router.get('/blogs', getAllBlog)
// router.get('/:id', getBlogById)
router.get('/:title', getBlogByName) // get blog by title
router.put('/update/:id', updateBlogById)
router.delete('/delete/:id', deleteBlogbyId)
router.get('/most-liked', mostLikedBlog)

module.exports = router