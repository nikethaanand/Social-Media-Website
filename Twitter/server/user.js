const express = require('express');
const router = express.Router();

const TwitterUserAccessor = require('./db/twitter.model');



router.post('/', async function(request, response) {
    const body = request.body;
    const username = body.username;
    const password = body.password;
    const emailId=body.emailId;
    const fullname=body.fullname;
    console.log(body);
    console.log(username+"username");
    console.log(password+"password");
    if(password=="" || username=="" || emailId=="" || fullname=="" ) {
        response.status(400);
        return response.send("Missing details")
    }

    const newUser = {
        username: request.body.username,
        password: request.body.password,
        emailId:  request.body.emailId,
        fullname: request.body.fullname
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

 console.log("hi");
 router.get('/:username', async function(request, response) {
    try {
        const username = request.params.username;
        const allUsersPromise = TwitterUserAccessor.findpasswordByUsername(username);
        
        // Wait for the promise to resolve
        const allUsers = await allUsersPromise;
        
        let usernameResponse = null;

        console.log(username + "username");
        console.log(allUsers.username + "all users");

       
            if (allUsers.username === username) {
                return response.json(allUsers.password);
            }
        

        else {
            response.status(404);
            return response.send("Could not find user with User name " + username);
        }
    } catch (error) {
        console.error('Error retrieving user by username:', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});





module.exports = router;


