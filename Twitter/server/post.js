const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const TwitterPostAccessor = require('./db/userpost.model');

const upload = multer({ dest: 'uploads/' });

router.post('/createPostapi', upload.single('selectedImage'), async function (request, response) {
  console.log('Request received');
  const body = request.body;
  const username = body.username;
  const postContent = body.postContent;
  const selectedImage = request.file; // Access uploaded image

  console.log(body);

  if (username === '' || postContent === '') {
    response.status(400);
    return response.send('Missing username or post content');
  }

  try {
    // Save uploaded image file
    const imagePath = await saveImageFile(selectedImage);

    // Construct the image URL
    const imageUrl = `/uploads/${imagePath}`;

    const newUser = {
      username: request.body.username,
      postContent: request.body.postContent,
      selectedImage: imageUrl, // Store image URL
    };

    const createdPost = await TwitterPostAccessor.addPost(newUser);

    response.cookie('username', createdPost.username);
    response.json({
      message: 'Successfully created post and uploaded image',
      post: createdPost,
    });
  } catch (error) {
    console.error('Error creating post:', error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

async function saveImageFile(imageFile) {
  const filename = Date.now() + '-' + imageFile.originalname;
  const path = 'uploads/' + filename;

  try {
    fs.renameSync(imageFile.path, path);
    return filename;
  } catch (error) {
    console.error('Error saving image file:', error);
    throw error;
  }
}

// GET all user posts
router.get('/all', async function (req, response) {
  try {
    const allPosts = await TwitterPostAccessor.getAllPosts();
    response.json(allPosts);
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


