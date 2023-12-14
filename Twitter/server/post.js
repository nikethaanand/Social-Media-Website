const express = require('express');
const router = express.Router();
const multer = require('multer');
const TwitterPostAccessor = require('./db/userpost.model');
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

router.post('/createPostapi', upload.single('selectedImage'), async (req, res) => {
    try {
      const usernametest = req.cookies.username

  
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
  

    router.get('/:userName', async (req, res) => {
      try {
        const username = req.params.userName;
        const allPosts = await TwitterPostAccessor.getpostsNotByUsername(username);
        
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


    router.get('/user/:userName', async (req, res) => {
      try {
        const username = req.params.userName;
        const allPosts = await TwitterPostAccessor.getpostsByUsername(username);
        
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
    router.get('/all', async (req, res) => {
        try {
          
          const allPosts = await TwitterPostAccessor.getAllPosts();
           
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
      
     
      router.put('/update/:postId', async (req, res) => {
        const { postId } = req.params;
        const { postContent } = req.body;
      
        try {
          const postToUpdate = await TwitterPostAccessor.getPostById(postId);
      
          if (!postToUpdate) {
            return res.status(404).json({ error: 'Post not found' });
          }
      
          postToUpdate.postContent = postContent;
      
          await postToUpdate.save();
      
          res.json({ message: 'Post updated successfully', updatedPost: postToUpdate });
        } catch (error) {
          console.error('Error updating post:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      });
      router.delete('/delete/:postId', async (req, res) => {
        const { postId } = req.params;
      
        try {
          const postToDelete = await TwitterPostAccessor.getPostById(postId);
      
          if (!postToDelete) {
            return res.status(404).json({ error: 'Post not found' });
          }
      
          await TwitterPostAccessor.deletePost(postId);
      
          res.json({ message: 'Post deleted successfully' });
        } catch (error) {
          console.error('Error deleting post:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      });
      


module.exports = router;
