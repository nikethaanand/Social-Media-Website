import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import axios from 'axios';
import AllPosts from './AllPosts';

// import Cookies from 'js-cookie'; 

const CreatePost = () => {
  const [postContent, setpostContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [postContentError, setpostContentError] = useState(false);
  const [showPosts, setShowPosts] = useState(false);
  const handleTextChange = (event) => {
    setpostContent(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  
  const validateInputs = () => {
    let isValid = true;

    if (postContent.trim() === '') {
      setpostContentError(true);
      isValid = false;
    }
    return isValid;
  };

  // async function handleSubmit() {
  //   if (!validateInputs()) {
  //     return; // Stop if inputs are not valid
  //   }
  //   const username="joe";
  //   const newPost = {
  //     username: username,
  //     postContent: postContent,
  //     selectedImage:selectedImage
  //   };
  //   console.log(postContent);
  //   try {
  //     console.log(newPost);
  //     const response = await axios.post('http://localhost:3500/api/posts/createPostapi', newPost);
  //     console.log(response.data);
     
  //     setpostContent('');
  //     setSelectedImage('');
    
  //   } catch (error) {
  //     console.error("Error creating post:", error);
  //   }
  // }

  async function handleSubmit () {
  const formData = new FormData();
  const username="joe";
  formData.append('username', username);
  formData.append('postContent', postContent);
  formData.append('selectedImage', selectedImage);

  try {
    const response = await axios.post('http://localhost:3500/api/posts/createPostapi', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response.data);
    formData.forEach((value, key) => {
      formData.delete(key);
    });
    
  } catch (error) {
    console.error('Error creating post:', error);
  }
};


// async function showPosts() {
//   try {
//     const response = await axios.get('http://localhost:3500/api/posts/all');
//     console.log(response.data);
//     // Handle the response data as needed, e.g., update state to display posts.
//   } catch (error) {
//     console.error('Error fetching posts:', error);
//   }
// }

const handleShowPosts = () => {
  setShowPosts(true);
};


  return (
    <>
      <Box
        component="span"
        className="createboxstyle"
        sx={{
          p: 3,
         
          maxWidth: 600,
          margin: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h4>Username </h4>
        <TextField
          multiline
          rows={4}
          fullWidth
       
          placeholder='Whats Happening?'
          variant="outlined"
          value={postContent}
          onChange={handleTextChange}
          style={{ marginBottom: '10px' }}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ margin: '10px 0', alignSelf: 'flex-start' }}
        />

        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
        <Button variant="contained" color="primary" onClick={handleShowPosts}>
          Show posts
        </Button>
        {showPosts && <AllPosts />} {/* Conditionally render AllPosts */}

      </Box>
    </>
  );
};

export default CreatePost;



   {/* <Box className="createboxstyle">
          <h1>Createfvfv post</h1>
            
          </Box> */}