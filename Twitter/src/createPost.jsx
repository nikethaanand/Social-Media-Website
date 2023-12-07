import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import axios from 'axios';

// import Cookies from 'js-cookie'; 

const CreatePost = () => {
  const [postContent, setpostContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [postContentError, setpostContentError] = useState(false);
 
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

  async function handleSubmit() {
    if (!validateInputs()) {
      return; // Stop if inputs are not valid
    }
    const username="joe";
    const newPost = {
      username: username,
      postContent: postContent,
      selectedImage:selectedImage
    };
    console.log(postContent);
    try {
      console.log(newPost);
      const response = await axios.post('http://localhost:3500/api/posts/createPostapi', newPost);
      console.log(response.data);
     
      setpostContent('');
      setSelectedImage('');
    
    } catch (error) {
      console.error("Error creating post:", error);
    }
  }

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
      </Box>
    </>
  );
};

export default CreatePost;



   {/* <Box className="createboxstyle">
          <h1>Createfvfv post</h1>
            
          </Box> */}