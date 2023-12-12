import React, { useEffect, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import axios from 'axios';
import ImageUploadForm from './input';

const CreatePost = () => {
  const [fetchedImages, setFetchedImages] = useState([]);
  const [userName, setUsername] = useState('');
  async function getUsername() {
    const response = await axios.get('/api/twitter/isLoggedIn')

    if(response.data.username) {
      setUsername(response.data.username)
    }
  }

  useEffect( function() {
     getUsername();
  }, []);
  // Function to fetch images
  const handleGetImages = async () => {
    try {
      // Call the backend GET method to fetch images
      //const response = await axios.get(`/api/posts/${userName}`);
     const response = await axios.get('/api/posts/all');
      //console.log('Fetched images:', response.data);

      // Store the fetched images in the state
      console.log(response.data);
      
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
     


<ImageUploadForm/>
<button onClick={handleGetImages} className="twitter-button" style={{ marginTop: '20px' }}>Refresh</button>

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
                 // console.log('post:', post);
                }}
              />
            </div>
          ) : null}
        </div>
      ))}
    </Box>
  );
};

export default CreatePost;
