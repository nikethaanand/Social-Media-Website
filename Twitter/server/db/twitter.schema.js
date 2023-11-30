const Schema = require('mongoose').Schema;

exports.TwitterSchema = new Schema({
    username: String,
    password: String,
    name:String
}, { collection : 'twitterTable' });