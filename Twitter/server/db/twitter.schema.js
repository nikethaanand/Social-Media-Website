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
}, { collection: 'twitterTable' });

const TwitterModel = mongoose.model('Twitter', TwitterSchema);

module.exports = TwitterModel;