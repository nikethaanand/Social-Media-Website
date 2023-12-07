const express = require('express');
const router = express.Router();

const TwitterPostAccessor = require('./db/userpost.model');



router.post('/createPostapi', async function(request, response) {
    console.log('Request received');
    const body = request.body;
    const username = body.username;
    const postContent = body.postContent;
    const selectedImage=body.selectedImage;
    console.log(body);
    
    console.log(username +" "+ postContent+" in post.js");
    if(username=="" ||postContent=='' ) {
        response.status(400);
        return response.send("Missing username and post details")
    }
    console.log('going into try');
    try{
    const newUser = {
        username: request.body.username,
        postContent: request.body.postContent,
        selectedImage:  request.body.selectedImage,
    }

    const createdPost = await TwitterPostAccessor.addPost(newUser)

    response.cookie('username', createdPost.username);
    response.json("Successfully created user" + createdPost);

        }
        catch(error)
        {
        console.error('Error creating user:', error);
        response.status(500).json({ error: 'Internal Server Error' });
        }
})
 
  

  
// 
// router.get('/all', async function(req, response) {
//     const body = response.body;
//     console.log(body);
//    const allUsers = await TwitterPostAccessor.getAllTwitterUsers();
//    console.log(allUsers+"all users in user");
//    return  response.json(allUsers);

// })

 
//In the login page once the user enters the username and password, username is validated with the db
//It returns the password encrypted
//  router.get('/:username', async function(request, response) {
//     try {
//         const username = request.params.username;
//         const allUsersPromise = TwitterPostAccessor.findpasswordByUsername(username);
        
//         const allUsers = await allUsersPromise;
        
//         let usernameResponse = null;

//         console.log(username + "username");
//         console.log(allUsers.username + "all users");

       
//             if (allUsers.username === username) {
//                 return response.json(allUsers.password);
//             }
        

//         else {
//              return response.json('please enter a valid username');
//         }
//     } catch (error) {
//         return response.json('please enter a valid username');
       
//     }
// });






module.exports = router;


