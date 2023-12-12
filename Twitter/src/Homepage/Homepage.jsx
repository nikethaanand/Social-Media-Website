import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Navbar from '../junk/Navbar';
import Topbar from '../Navbar/topBar';
import CreatePost from './createPost';
import axios from 'axios';

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
    usernameMessage = <div>Logged in as {userName}</div>
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
      {/* <Navbar /> */}
      <Topbar /><h1> Welcome {usernameMessage} !!</h1>
      {usernameMessage}    

      <CreatePost style="createboxstyle" />


      {fetchedImages.length > 0 ? (
        fetchedImages.map((post) => (
          <div key={post._id} style={{marginLeft:"250px"}}>
            <h3>{post.username}</h3>
            <p>{post.postContent}</p>
            {post.selectedImage ? (
              <div style={{ maxWidth: '300px', margin: 'auto' }}>
                <img
                  src={`data:image/jpeg;base64,${post.selectedImage}`}
                  alt="Post Image"
                  style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
                />
              </div>
            ) : null}
          </div>
        ))
      ) : (
        <p>Loading...</p>
)}
    </>
  );
};

export default HomePage;
