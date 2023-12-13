

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TwitterSchema = new Schema({
    username: String,
    password: String,
    fullname: String,
    emailId: String,
    timeCreated: { type: Date, default: Date.now },
    description:String,
}, { collection: 'twitterusers' });


const TwitterModel = mongoose.model('Twitter', TwitterSchema);

module.exports = TwitterModel;