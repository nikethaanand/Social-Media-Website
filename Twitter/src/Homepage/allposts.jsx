import React, { useState, useEffect } from 'react';
import { Drawer, List, ListItem, ListItemText, Typography,AppBar, Toolbar, Button, } from '@mui/material';
import twitterLogo from '../assets/twitterLogo.jpeg';
import '../styles.css';
import axios from 'axios'; 
import './homepage.css';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

//Load all the posts
const Allposts = () => {
    const [fetchedImages, setFetchedImages] = useState([]);
    const navigate = useNavigate();
   
   
    useEffect(() => {
     
        handleGetImages();
      },
     []);
  
    const handleGetImages = async () => {
      try {
        const response = await axios.get('/api/posts/all');
        setFetchedImages(response.data);
      } catch (error) {
        console.error('Error fetching images', error);
      }
    };
  
    const calculateJoinDuration = (timeCreated) => {
      const postDate = moment(timeCreated);
      const currentDate = moment();
      const duration = moment.duration(currentDate.diff(postDate));
      return duration.humanize();
    };

    const signUp = async () => {
      try {
        navigate('/SignUp');
      } catch (error) {
        console.error('Error going to sign in page', error);
      }
    };
  
    const signIn = async () => {
      try {
        navigate('/SignIn');
      } catch (error) {
        console.error('Error going to sign up page', error);
      }
    };

    return (
        <>
         <AppBar position="static" sx={{ backgroundColor: '#1da0f2' }}>
      <Toolbar>
      <ListItem button>
          <img src={twitterLogo} alt="Logo" className="Twitter-logo" />
        </ListItem>
        <ListItem button onClick={signUp}>
          <ListItemText primary="sign Up" />
        </ListItem>
        <ListItem button onClick={signIn}>
          <ListItemText primary="signIn" />
     </ListItem>
      </Toolbar>
    </AppBar>


    <div className="container">
        <div className="side-line" />
        <div className="content">
          <div className="nameStyle"> Welcome </div>
          {fetchedImages.length > 0 ? (
            fetchedImages.map((post, index) => (
              <div key={post._id} className="postContainer">
                <h3>{post.username}</h3>
                <p>{calculateJoinDuration(post.timeCreated)} Ago</p>
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


      
    
    export default Allposts;