import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import axios from 'axios';
import AllPosts from './AllPosts';
import ImageUploadForm from './input';

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

  const handleImageUpload = async () => {
    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result.split(',')[1];

        try {
          // Send base64 data to the backend
          await axios.post('http://localhost:3500/api/posts/uploadImage', { data: base64String });
          console.log('Image uploaded successfully');
        } catch (error) {
          console.error('Error uploading image', error);
        }
      };

      reader.readAsDataURL(selectedImage);
    }
  };

  const handleSubmit = async () => {
    if (validateInputs()) {
      // Upload the image first
      await handleImageUpload();

      // Now, proceed with the rest of the form data
      const formData = new FormData();
      const username = 'joe';
      formData.append('username', username);
      formData.append('postContent', postContent);

      try {
        const response = await axios.post('http://localhost:3500/api/posts/createPostapi', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // Clear inputs on success
        setpostContent('');
        setSelectedImage(null);
        setShowPosts(true);
      } catch (error) {
        console.error('Error creating post:', error);
        // Handle the error, for example, show a user-friendly message
        alert('Error creating post. Please try again.');
      }
    }
  };

  const [fetchedImages, setFetchedImages] = useState([]);

  // Function to fetch images
  const handleGetImages = async () => {
    try {
      // Call the backend GET method to fetch images
      const response = await axios.get('http://localhost:3500/api/posts/all');
      console.log('Fetched images:', response.data);

      // Store the fetched images in the state
      setFetchedImages(response.data);
    } catch (error) {
      console.error('Error fetching images', error);
    }
  };

  return (
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
      {/* <h4>Username </h4>
      <TextField
        multiline
        rows={4}
        fullWidth
        placeholder="Whats Happening?"
        variant="outlined"
        value={postContent}
        onChange={handleTextChange}
        style={{ marginBottom: '10px' }}
      /> */}


<ImageUploadForm/>
<button onClick={handleGetImages} className="twitter-button" style={{ marginTop: '20px' }}>Fetch Images</button>

{fetchedImages.map((post) => (
        <div key={post._id}>
          <h3>{post.username}</h3>
          <p>{post.postContent}</p>
          {post.selectedImage ? (
            <div style={{ maxWidth: '300px', margin: 'auto' }}>
              <img
                src={`data:image/jpeg;base64,${post.selectedImage}`}
                alt="Post Image"
                style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
                onError={(e) => {
                  console.error('Error loading image:', e);
                  console.log('post:', post);
                }}
              />
            </div>
          ) : null}
        </div>
      ))}

      {/* <input

        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ margin: '10px 0', alignSelf: 'flex-start' }}
      /> */}

      {/* <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button> */}
      {/* {showPosts && <AllPosts />} */}


    </Box>
  );
};

export default CreatePost;
