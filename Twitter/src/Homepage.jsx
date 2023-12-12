import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Navbar from './Navbar';
import Topbar from './topBar';
import CreatePost from './createPost';
import axios from 'axios';

const HomePage = () => {
  // const location = useLocation();
  // const username = new URLSearchParams(location.search).get('username');
  // console.log(username);
  const [userName, setUsername] = useState('');
  
  async function getUsernamefromCookie() {
    const response1 = await axios.get('http://localhost:3500/api/twitter/isLoggedIn');
    console.log(response1.data+"response");
    if(response1.data.username) {
      setUsername(response1.data.username)
    }
  }
  // async function getUsername() {
  //   return axios.get('/api/user/isLoggedIn', { withCredentials: true })
  //     .then(response => {
  //       const { username, isLoggedIn } = response.data;
  //       console.log(response);
  //       console.log('Username:', username);
  //       console.log('Is logged in:', isLoggedIn);
  //       return { username, isLoggedIn };
  //     })
  //     .catch(error => {
  //       console.error('Error fetching username:', error);
  //       return { username: null, isLoggedIn: false };
  //     });
  // }


  useEffect(() => {
    handleGetImages();
    getUsernamefromCookie();
    
  }, []);
  let usernameMessage = <div>Loading...</div>
  if(userName) {
    usernameMessage = <div>Logged in as {userName}</div>
  }
  const [fetchedImages, setFetchedImages] = useState([]);

  // Function to fetch images
  const handleGetImages = async () => {
    try {
      // Call the backend GET method to fetch images
      const response = await axios.get('http://localhost:3500/api/posts/all');
      //console.log('Fetched images:', response.data);

      // Store the fetched images in the state
      setFetchedImages(response.data);
    } catch (error) {
      console.error('Error fetching images', error);
    }
  };

  return (
    <>
      <Navbar />
      <Topbar />
      <h1>Welcome user vfvf fvfv fvf {usernameMessage}</h1>
      {usernameMessage}
      <CreatePost style="createboxstyle" />


      {fetchedImages.length > 0 ? (
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
