const mongoose = require('mongoose');

const TwitterPostSchema = require('./userpost.schema').TwitterPostSchema;
const TwitterPostModel = mongoose.model('TwitterPost', TwitterPostSchema);

// const TwitterPostModel = mongoose.model('Twitter', TwitterPostSchema);

function addPost(post) {
    return TwitterPostModel.create(post);
}

function addLike(like) {
    return TwitterPostModel.create(like);
}

function addComment(comment) {
    return TwitterPostModel.create(comment);
}

function getAllPosts() {
    return TwitterPostModel.find();
}

function findpostsByUsername(post) {
   

}

module.exports = {
    addPost,
    addLike,
    addComment,
    getAllPosts,
    
};
