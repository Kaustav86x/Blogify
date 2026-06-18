const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    postId: {
        type: String,
        required: true,
        index: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    comment: {
        type: String,
        required: true,
        trim: true,
        maxlength: 2000,
    },
},
{
    timestamps: true,
}
);

module.exports = mongoose.model('Comment', commentSchema)