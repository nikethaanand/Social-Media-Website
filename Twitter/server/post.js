const express = require('express');
const router = express.Router();
const multer = require('multer');
const TwitterPostAccessor = require('./db/userpost.model');

const storage = multer.memoryStorage(); // Store files in memory as buffers
const upload = multer({ storage: storage });

router.post('/createPostapi', upload.single('selectedImage'), async (req, res) => {
    try {
      console.log('Received file:', req.file);  // Log the received file
  
      const { username, postContent } = req.body;
      const selectedImage = req.file;
        console.log(selectedImage+"selec");
      if (!username || !postContent) {
        return res.status(400).json({ error: 'Missing username or post content' });
      }
  
      const base64String = selectedImage ? selectedImage.buffer.toString('base64') : null;
      
      const createdPost = await TwitterPostAccessor.addPost({
        username,
        postContent,
        selectedImage: base64String,
      });
  
      res.status(200).json({
        success: true,
        message: 'Successfully created post and uploaded image',
        post: createdPost,
      });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });
  

    router.get('/all', async (req, res) => {
        try {
          const allPosts = await TwitterPostAccessor.getAllPosts();
            console.log(allPosts);
          // Convert the image to base64 for each post
          const postsWithBase64Images = allPosts.map(post => {
            const postObject = post.toObject();
            if (postObject.selectedImage) {
              postObject.selectedImage = postObject.selectedImage.toString('base64');
            }
            return postObject;
          });
      
          res.json(postsWithBase64Images);
        } catch (error) {
          console.error('Error fetching posts:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      });
      

module.exports = router;
