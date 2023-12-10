const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const TwitterPostSchema = new Schema({
//   _id: ObjectId,
  username: String,
  postContent: String,
  timeCreated: { type: Date, default: Date.now },
  selectedImage: String, 
  likes: [
    {
      username: String,
      data: { type: Date, default: Date.now },
    },
  ],
  comments: [
    {
      username: String,
      commentText: String,
      data: { type: Date, default: Date.now },
    },
  ],
  retweet: [
    {
      username: String,
      data: { type: Date, default: Date.now },
    },
  ],
}, { collection: 'userpost' });

const TwitterPostModel = mongoose.model('TwitterPost', TwitterPostSchema);

module.exports = TwitterPostModel;
