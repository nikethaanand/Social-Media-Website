import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton,Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Navbar from '../junk/Navbar';
import Topbar from '../Navbar/topBar';
import axios from 'axios';
import ImageUploadForm from './input';
import './homepage.css';

const HomePage = () => {
 
  const [userName, setUsername] = useState('');
  const [fetchedImages, setFetchedImages] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getUsernamefromCookie() {
    try{
    const response = await axios.get('/api/twitter/isLoggedIn')
    if(response.data.username) {
      setUsername(response.data.username)
    }
  }
  catch(error)
  {
    console.log(error);
  }
  }


  useEffect(() => {
    getUsernamefromCookie().then(() => {
      setLoading(false); // Set loading to false after getting the username
    });
  }, []);

  useEffect(() => {
    if (!loading) {
      handleGetImages();
    }
  }, [loading]);

  let usernameMessage = <div>Loading...</div>
  if(userName) {
    usernameMessage = <div> {userName}</div>
  }

  const handleGetImages = async () => {
    try {
      const response = await axios.get(`/api/posts/${userName}`);
      setFetchedImages(response.data);
    } catch (error) {
      console.error('Error fetching images', error);
    }
  };
  // Function to fetch images
  // const handleGetImages = async () => {
  //   try {
  //     console.log(userName);
  //     // Call the backend GET method to fetch images
  //     const response = await axios.get(`/api/posts/${userName}`);
  //      //const response = await axios.get('/api/posts/all');
  //     //console.log('Fetched images:', response.data);

  //     // Store the fetched images in the state
  //     setFetchedImages(response.data);
  //   } catch (error) {
  //     console.error('Error fetching images', error);
  //   }
  // };
 
  return (
    <>
      <Topbar />
      <div className="container">
        <div className="side-line" />
        <div className="content">
          <div className="nameStyle"> Welcome </div>
          <ImageUploadForm style="createboxstyle" />
          {/* <button
            onClick={handleGetImages}
            className="twitter-button"
            style={{ marginTop: '20px' }}
          >
            Refresh Posts
          </button> */}
          {fetchedImages.length > 0 ? (
            fetchedImages.map((post, index) => (
              <div key={post._id} className="postContainer">
                <h3>{post.username}</h3>
                <p className="postContent">{post.postContent}</p>
                {post.selectedImage ? (
                  <div className="imageContainer">
                    <img
                      src={`data:image/jpeg;base64,${post.selectedImage}`}
                      alt="Post Image"
                      className="postImage"
                    />
                  </div>
                ) : null}
                {index < fetchedImages.length - 1 && <hr className="horizontalLine" />}
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className="side-line" />
      </div>
    </>
  );
};

export default HomePage;