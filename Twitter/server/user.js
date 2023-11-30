const express = require('express');
const router = express.Router();

const TwitterUserAccessor = require('./db/twitter.model');


const twitterUserDb = [
    {username: "Dave98", password: 100,name: 'dave'},
    {username: "John", password: 100,name: 'john'},
    {username: "Steve", password: 100,name: 'steve'},
]

router.post('/', async function(request, response) {
    const body = request.body;
    const username = body.username;
    const name = body.name;
    console.log(body);
    console.log(username+"username");
    if(name=="" || username=="") {
        response.status(400);
        return response.send("Missing user name or owner")
    }

    const newUser = {
        username: request.body.username,
        name: request.body.name,
    }
    twitterUserDb.push({
        username:username,
        name:name,

    })
    const createdUser = await TwitterUserAccessor.insertTwitter(newUser)

    response.json("Successfully created user" + createdUser);
    return res.json(createdUser);
})

  
   
// router.get('/', function(req, res) {
//     res.json(twitterUserDb);
// });
  

router.get('/all', async function(req, response) {

    // const ownerQuery = req.query.owner;
 
    

    // if(ownerQuery) {
    //     const foundPokemon = await TwitterUserAccessor.findPokemonByOwner(ownerQuery);
    //     return response.json(foundPokemon);
    // }

   const allUsers = await TwitterUserAccessor.getAllTwitterUsers();
   return  response.json(allUsers);
 
})




module.exports = router;


