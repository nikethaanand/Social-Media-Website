import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField } from '@mui/material';
import './styles.css';

const ImageUploadForm = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [postContent, setPostContent] = useState('');

  const handleTextChange = (event) => {
    setPostContent(event.target.value);
  };

  const handleImageUpload = async () => {
    if (selectedImage) {
      const reader = new FileReader();
  
      reader.onloadend = async () => {
        const base64String = reader.result.split(',')[1];
  
        try {
          const formData = new FormData();
          formData.append('selectedImage', selectedImage); // Use the correct name here
          formData.append('username', 'joe'); // Replace with the actual username
          formData.append('postContent', postContent);
  
          await axios.post('http://localhost:3500/api/posts/createPostapi', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
  
          console.log('Image uploaded successfully');
        } catch (error) {
          console.error('Error uploading image', error);
        }
      };
  
      reader.readAsDataURL(selectedImage);
    }
  };
  


  return (
    <div>
      <TextField
        multiline
        rows={4}
        fullWidth
        placeholder="What's Happening?"
        variant="outlined"
        value={postContent}
        onChange={handleTextChange}
        style={{ marginBottom: '10px' }}
      />
      <input type="file" onChange={(e) => setSelectedImage(e.target.files[0])} />
      <button onClick={handleImageUpload} className="twitter-button">Upload Image</button>
    </div>
  );
};

export default ImageUploadForm;
