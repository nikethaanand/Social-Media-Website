const express = require('express');
const router = express.Router();

const TwitterUserAccessor = require('./db/twitter.model');


// const twitterUserDb = [
//     {username: "Dave98", password: 100,name: 'dave'},
//     {username: "John", password: 100,name: 'john'},
//     {username: "Steve", password: 100,name: 'steve'},
// ]

router.post('/', async function(request, response) {
    const body = request.body;
    const username = body.username;
    const password = body.password;
    console.log(body);
    console.log(username+"username");
    console.log(password+"password");
    if(password=="" || username=="") {
        response.status(400);
        return response.send("Missing user name or owner")
    }

    const newUser = {
        username: request.body.username,
        password: request.body.password,
    }
    // twitterUserDb.push({
    //     username:username,
    //     password:password,

    // })
    const createdUser = await TwitterUserAccessor.insertTwitter(newUser)

    response.json("Successfully created user" + createdUser);
    return response.json(createdUser);
})

  
   
// router.get('/', function(req, res) {
//     res.json(twitterUserDb);
// });
  

router.get('/all', async function(req, response) {
    const body = response.body;
    console.log(body);
   const allUsers = await TwitterUserAccessor.getAllTwitterUsers();
   console.log(allUsers+"all users in user");
   return  response.json(allUsers);

})




module.exports = router;


