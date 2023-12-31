const express = require('express');
const router = express.Router();

const TwitterUserAccessor = require('./db/twitter.model');
const bcrypt = require("bcryptjs");

//Post api for user signing up(Sign up page)
//Cookie is also created with the username since it direclty has to move to the homepage
router.post('/', async function(request, response) {
    const body = request.body;
    const username = body.username;
    const password = body.password;
    const emailId=body.emailId;
    const fullname=body.fullname;
   
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
        fullname: request.body.fullname,
        description:"please enter a description"
    }

    const createdUser = await TwitterUserAccessor.insertTwitter(newUser)
    
    const receivedUser = await TwitterUserAccessor.getUserByUsername(username)
    response.cookie('username', receivedUser.username);
    // response.cookie('username', receivedUser.username, { path: '/', domain: 'localhost', httpOnly: true, secure: true, sameSite: 'None' });

    response.json("Successfully created user" + createdUser);

        }
        catch(error)
        {
        console.error('Error creating user:', error);
        response.status(500).json({ error: 'Internal Server Error' });
        }
})
 
  
//api that posts login details and returns password
router.post('/login', async (request, response) => {
  try {
    const { username, password, hashedPassword } = request.body;
   
    const isPasswordMatch = await bcrypt.compare(password, hashedPassword);
    if (isPasswordMatch) {
      const receivedUser = await TwitterUserAccessor.getUserByUsername(username)
      response.cookie('username', receivedUser.username);
      // response.cookie('username', receivedUser.username, { path: '/', domain: 'localhost', httpOnly: true, secure: true, sameSite: 'None' });

    
      return response.json({ loggedIn: true });
    } else {
      return response.json({ loggedIn: false });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return response.status(500).json({ error: 'Internal Server Error' });
  }
});


  router.post('/logout', async function(request, response) {
   response.clearCookie('username');
    response.send();
});

//used to check if user is logged in 
router.get('/isLoggedIn',async function(request, response) {

  const username = request.cookies.username;
  response.send({
    username: username,
      isLoggedIn: !!username,
    
  });
})
  //In the login page once the user enters the username and password, username is validated with the db
//It returns the password encrypted
 router.get('/:username', async function(request, response) {
  try {
      const username = request.params.username;
      const allUsersPromise = TwitterUserAccessor.findpasswordByUsername(username);
      
      const allUsers = await allUsersPromise;
      
      let usernameResponse = null;

     
    
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
//get the user details from the username
router.get('/user/:username', async function(request, response) {
  try {
      const username = request.params.username;
      const userPromise = TwitterUserAccessor.getUserByUsername(username);
      
      const user = await userPromise;

    if (user) {
      response.status(200).json(user);
    } else {
      response.status(404).json({ error: 'User not found' });
    }

  } catch (error) {
    console.error('Error in get user details:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
   
});
//update the user description by default a value is set 
router.put('/updateBio', async function(request, response) {
  try {
    const { username, description } = request.body;
    const updatedUser = await TwitterUserAccessor.updateUserDescription(username, description);
    response.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user description:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;


