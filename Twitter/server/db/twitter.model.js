const mongoose = require('mongoose');

const TwitterSchema = require('./twitter.schema').TwitterSchema;

const TwitterModel = mongoose.model('Twitter', TwitterSchema);

function insertTwitter(twitter) {
    return TwitterModel.create(twitter);
}

function getAllTwitterUsers() {
    return TwitterModel.find();
}
function getUserByUsername(username) {
    return TwitterModel.findOne({username: username}).exec();
}
function findpasswordByUsername(username) {
    try{
    return TwitterModel.findOne({ username: username }).exec();
    }
    catch (error) {
        console.error('Error in findpasswordByUsername:', error);
        throw error;
      }
}

module.exports = {
    insertTwitter,
    getAllTwitterUsers,
    findpasswordByUsername,
    getUserByUsername,
};
