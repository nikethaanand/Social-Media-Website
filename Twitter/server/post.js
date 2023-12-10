const express = require('express');
const router = express.Router();
const multer = require('multer');
const TwitterPostAccessor = require('./db/userpost.model');

const storage = multer.memoryStorage(); // Store files in memory as buffers
const upload = multer({ storage: storage });


router.post('/createPostapi', upload.single('selectedImage'), async function (request, response) {
    try {
      console.log('Request received');
  
      const { username, postContent } = request.body;
      const selectedImage = request.file;
  
      // Validate input
      if (!username || !postContent || !selectedImage) {
        return response.status(400).json({ error: 'Missing username, post content, or image' });
      }
  
      // Additional validation for image format and size can be added here
  
      console.log('Body:', request.body);
  
      // Store the image directly in MongoDB as binary data
      const createdPost = await TwitterPostAccessor.addPost({
        username,
        postContent,
        selectedImage: selectedImage.buffer, // Store image buffer
      });
  
      // Set a secure cookie if needed
      response.cookie('username', createdPost.username, { secure: true, httpOnly: true });
  
      return response.status(200).json({
        success: true,
        message: 'Successfully created post and uploaded image',
        post: createdPost,
      });
    } catch (error) {
      console.error('Error creating post:', error);
      return response.status(500).json({ error: 'Internal Server Error' });
    }
  });
// GET all user posts
// router.get('/all', async function (req, response) {
//   try {
//     const allPosts = await TwitterPostAccessor.getAllPosts();
//     response.json(allPosts);
//   } catch (error) {
//     console.error('Error fetching posts:', error);
//     response.status(500).json({ error: 'Internal Server Error' });
//   }
// });

router.get('/all', async function (req, response) {
  try {
    const allPosts = await TwitterPostAccessor.getAllPosts();
    // Convert binary image data to Base64 in each post
    const postsWithBase64Images = allPosts.map(post => ({
      ...post.toObject(),
      selectedImage: post.selectedImage.toString('base64'),
    }));
    response.json(postsWithBase64Images);
  } catch (error) {
    console.error('Error fetching posts:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});



 

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


