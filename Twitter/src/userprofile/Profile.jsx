
import React, { useEffect, useState } from 'react';
import Topbar from '../Navbar/topBar';
import Twitterprofilephoto from '../assets/Twitterprofilephoto.png';
import axios from 'axios';
import './profile.css';
import moment from 'moment';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, TextField } from '@mui/material';

export default function Profile() {

    const [userName, setUsername] = useState('');
    const [fetchedImages, setFetchedImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [editingPostId, setEditingPostId] = useState(null);
    const [editedPostContent, setEditedPostContent] = useState('');


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
    async function getuserDetails() {
        try{
        const response = await axios.get(`/api/twitter/user/${userName}`);
        setUserData(response.data);
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
        getuserDetails();
        handleGetImages();
      }
    }, [loading,userName]);

  
    const handleGetImages = async () => {
      try {
        const response = await axios.get(`/api/posts/user/${userName}`);
        setFetchedImages(response.data);
      } catch (error) {
        console.error('Error fetching images', error);
      }
    };
    const calculateJoinDuration = () => {
        if (userData && userData.timeCreated) {
          const joinDate = moment(userData.timeCreated);
          const currentDate = moment();
          const duration = moment.duration(currentDate.diff(joinDate));
          return duration.humanize();
        }
        return 'Unknown';
      };


      const calculatepostDuration = (timeCreated) => {
        const postDate = moment(timeCreated);
        const currentDate = moment();
        const duration = moment.duration(currentDate.diff(postDate));
        return duration.humanize();
      };

      const handleEditPost = (postId) => {
        // Find the post by postId
        const postToEdit = fetchedImages.find((post) => post._id === postId);
    
        // Set the editing post state
        setEditingPostId(postId);
        setEditedPostContent(postToEdit.postContent);
      };
    
      const handleUpdatePost = async () => {
        try {
          // Call the backend API to update the post
          await axios.put(`/api/posts/update/${editingPostId}`, {
            postContent: editedPostContent,
          });
    
          // Clear the editing state
          setEditingPostId(null);
          setEditedPostContent('');
    
          // Fetch the updated posts
          handleGetImages();
        } catch (error) {
          console.error('Error updating post', error);
        }
      };
    
      const handleDeletePost = async (postId) => {
        try {
          // Call the backend API to delete the post
          await axios.delete(`/api/posts/delete/${postId}`);
    
          // Fetch the updated posts
          handleGetImages();
        } catch (error) {
          console.error('Error deleting post', error);
        }
      };

      const sortedImages = fetchedImages.sort((a, b) => new Date(b.timeCreated) - new Date(a.timeCreated));

      const [isEditingBio, setIsEditingBio] = useState(false);

      const handleEditBio = () => {
          setIsEditingBio(true);
          // Set the initial bio value to the current user bio
          setEditedPostContent(userData.description);
      };
  
      const handleSaveBio = async () => {
          try {
              // Call the backend API to update the user bio
              await axios.put('/api/twitter/updateBio', {
                  username: userName,
                  description: editedPostContent,
              });
  
              // Clear the editing state
              setIsEditingBio(false);
              setEditedPostContent('');
  
              // Fetch the updated user details
              getuserDetails();
          } catch (error) {
              console.error('Error updating bio', error);
          }
      };


      return (
          <>
              <Topbar />
              <div className="container">
                  <div className="side-line" />
                  <div className="content">
                      <div className="nameStyle"> Welcome </div>
                      <img src={Twitterprofilephoto} alt="Logo" className="profile-photo" />
  
                      <div className="userDetailsContainer">
                          {userData ? (
                              <div>
                                  <p>Username: {userData.username}</p>
                                  <p>Full name: {userData.fullname}</p>
                                  <p>Email Id : {userData.emailId}</p>
                                  {isEditingBio ? (
                                    <div>
                                        <TextField
                                            multiline
                                            rows={4}
                                            fullWidth
                                            variant="outlined"
                                            value={editedPostContent}
                                            onChange={(e) => setEditedPostContent(e.target.value)}
                                        />
                                        <Button onClick={handleSaveBio}>Save Bio</Button>
                                    </div>
                                ) : (
                                    <>
                                        <p>User Bio : {userData.description}</p>
                                        {userData.description && (
                                            <IconButton onClick={handleEditBio}>
                                                <EditIcon />
                                            </IconButton>
                                        )}
                                    </>
                                )}
                                  <p>User since: {calculateJoinDuration()} ago</p>
                              </div>
                          ) : (
                              <p>Loading...</p>
                          )}
                      </div>
  
                      {sortedImages.length > 0 ? (
                          sortedImages.map((post, index) => (
                              <div key={post._id} className="postContainer">
                                  <div className="postHeader">
                                      <div className="leftContent">
                                          <h3>{post.username}</h3>
                                      </div>
                                      <div className="rightContent">
                                          {post.username === userName && editingPostId !== post._id && (
                                              <>
                                                  <IconButton onClick={() => handleEditPost(post._id)} className="editButton">
                                                      <EditIcon />
                                                  </IconButton>
                                                  <IconButton onClick={() => handleDeletePost(post._id)} className="deleteButton">
                                                      <DeleteIcon />
                                                  </IconButton>
                                              </>
                                          )}
                                          <p>{calculateJoinDuration(post.timeCreated)} Ago</p>
                                      </div>
                                  </div>
                                  {editingPostId === post._id ? (
                                      <div>
                                          <TextField
                                              multiline
                                              rows={4}
                                              fullWidth
                                              variant="outlined"
                                              value={editedPostContent}
                                              onChange={(e) => setEditedPostContent(e.target.value)}
                                          />
                                          <Button onClick={handleUpdatePost}>Save Changes</Button>
                                      </div>
                                  ) : (
                                      <p className="postContent">{post.postContent}</p>
                                  )}
                                  {post.selectedImage ? (
                                      <div className="imageContainer">
                                          <img
                                              src={`data:image/jpeg;base64,${post.selectedImage}`}
                                              alt="Post Image"
                                              className="postImage"
                                          />
                                      </div>
                                  ) : null}
                                  {index < sortedImages.length - 1 && <hr className="horizontalLine" />}
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
  }