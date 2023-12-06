// const Schema = require('mongoose').Schema;

// exports.TwitterSchema = new Schema({
//     username: String,
//     password: String,
//     name:String
// }, { collection : 'twitterTable' });


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TwitterSchema = new Schema({
    username: String,
    password: String,
    fullname: String,
    emailId: String 
}, { collection: 'twitterusers' });


const TwitterModel = mongoose.model('Twitter', TwitterSchema);

module.exports = TwitterModel;