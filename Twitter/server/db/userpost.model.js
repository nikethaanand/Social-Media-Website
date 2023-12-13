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

function getpostsNotByUsername(username) {
    return TwitterPostModel.find({ username: { $ne: username } }).exec();
   // 
}
function getpostsByUsername(username) {
    return TwitterPostModel.find({username: username}).exec();}


function getPostById(postId) {
        return TwitterPostModel.findById(postId).exec();
      }

module.exports = {
    addPost,
    addLike,
    addComment,
    getAllPosts,
    getpostsByUsername,
    getpostsNotByUsername,
    getPostById,
    
};
