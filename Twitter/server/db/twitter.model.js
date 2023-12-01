// const mongoose = require("mongoose")

// const TwitterSchema = require('./twitter.schema').TwitterSchema

// const TwitterModel = mongoose.model("Twitter", TwitterSchema);

// function insertTwitter(twitter) {
//     return TwitterModel.create(twitter);
// }

// function getAllTwitterUsers() {
//     return TwitterModel.find().exec();
// }

// // function findPokemonByOwner(owner) {
// //     return PokemonModel.find({owner: owner}).exec();
// // }

// // function findPokemonById(id) {
// //     return PokemonModel.findById(id).exec();
// // }

// module.exports = {
//     insertTwitter,
//     getAllTwitterUsers,
//     // getAllPokemon,
//     // findPokemonById
// };


const mongoose = require('mongoose');

const TwitterSchema = require('./twitter.schema').TwitterSchema;

const TwitterModel = mongoose.model('Twitter', TwitterSchema);

function insertTwitter(twitter) {
    return TwitterModel.create(twitter);
}

function getAllTwitterUsers() {
    return TwitterModel.find();
}

module.exports = {
    insertTwitter,
    getAllTwitterUsers,
};
