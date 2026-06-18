const express = require('express')

const { GetBlogComments, PostBlogComments } = require("../controllers/commentController")

const router = express.Router()

router.get("/comments/:postId", GetBlogComments);

router.post("/comments", PostBlogComments);

module.exports = router;