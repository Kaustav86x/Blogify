const Comment = require('../models/commentSchema');

const GetBlogComments = async(req, res) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId })
        .sort({createdAt: -1})
        .select("-email")    // not exposing email to frontend
        
        // not cachable since we want the latest comments to be fetched every time, and not the stale ones
        res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
        res.setHeader("Pragma", "no-cache");
        res.setHeader("Expires", "0");

        res.status(200).json(comments);    // successfully fetching all the comments
    }
    catch(err) {
        res.status(500).json({ message: "Failed to fetch comments" });
    }
}

const PostBlogComments = async(req, res) => {

    const {postId, name, email, comment} = req.body;

    if(!postId || !name || !email || !comment) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const newComment = await Comment.create({ postId, name, email, comment });

        const { email: _, ...safeComment } = newComment.toObject();  // stripping the email before saving the comment

        res.status(201).json(safeComment);   // record created
    }
    catch(err) {
        res.status(500).json({ message: "Failed to post comment"});
    }
}

module.exports = { GetBlogComments, PostBlogComments }