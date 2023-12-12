import React, { useEffect, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import axios from 'axios';
import ImageUploadForm from './input';

const CreatePost = () => {
  const [fetchedImages, setFetchedImages] = useState(null);
  const [userName, setUsername] = useState('');

  async function getUsername() {
    try {
      const response = await axios.get('/api/twitter/isLoggedIn');
      if (response.data.username) {
        setUsername(response.data.username);
      }
    } catch (error) {
      console.error('Error getting username:', error);
    }
  }

  useEffect(() => {
    getUsername();
  }, []);

  const handleGetImages = async () => {
    try {
      // Set fetchedImages to null before making the API call
      setFetchedImages(null);

      // Call the backend GET method to fetch images
      const response = await axios.get(`/api/posts/${userName}`);
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
      <ImageUploadForm />
      <button onClick={handleGetImages} className="twitter-button" style={{ marginTop: '20px' }}>
        Refresh
      </button>

      {fetchedImages !== null ? (
        fetchedImages.map((post) => (
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
                  }}
                />
              </div>
            ) : null}
          </div>
        ))
      ) : (
        <p></p>
      )}
    </Box>
  );
};

export default CreatePost;
