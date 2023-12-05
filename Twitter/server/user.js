const express = require('express');
const router = express.Router();

const TwitterUserAccessor = require('./db/twitter.model');
const bcrypt = require("bcryptjs");


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
    try{
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
        username: request.body.username,
        password: hashedPassword,
        emailId:  request.body.emailId,
        fullname: request.body.fullname
    }
  
    const createdUser = await TwitterUserAccessor.insertTwitter(newUser)

    response.json("Successfully created user" + createdUser);
        }
        catch(error)
        {
        console.error('Error creating user:', error);
        response.status(500).json({ error: 'Internal Server Error' });
        }
})
 
  

  

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
        
        const allUsers = await allUsersPromise;
        
        let usernameResponse = null;

        console.log(username + "username");
        console.log(allUsers.username + "all users");

       
            if (allUsers.username === username) {
                return response.json(allUsers.password);
            }
        

        else {
             return response.json('please enter a valid username');
        }
    } catch (error) {
        return response.json('please enter a valid username');
       
    }
});



router.post('/login', async (request, response) => {
    try {
      const { username, password, hashedPassword } = request.body;
       console.log(password);
       console.log(hashedPassword); 
      const isPasswordMatch = await bcrypt.compare(password, hashedPassword);
  
      if (isPasswordMatch) {
        response.json({ isValidPassword: true });
      } else {
        response.json({ isValidPassword: false });
      }
    } catch (error) {
      console.error('Error during login:', error);
      response.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

module.exports = router;


