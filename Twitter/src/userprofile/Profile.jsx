
import React, { useEffect, useState } from 'react';
import Topbar from '../Navbar/topBar';
import Twitterprofilephoto from '../assets/profileicon.png';
import axios from 'axios';
import './profile.css';
import moment from 'moment';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, TextField } from '@mui/material';
//Profile page of same user
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
        setLoading(false); 
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
        const postToEdit = fetchedImages.find((post) => post._id === postId);
    
        setEditingPostId(postId);
        setEditedPostContent(postToEdit.postContent);
      };
    
      const handleUpdatePost = async () => {
        try {
          await axios.put(`/api/posts/update/${editingPostId}`, {
            postContent: editedPostContent,
          });
    
          setEditingPostId(null);
          setEditedPostContent('');
    
          handleGetImages();
        } catch (error) {
          console.error('Error updating post', error);
        }
      };
    
      const handleDeletePost = async (postId) => {
        try {
          await axios.delete(`/api/posts/delete/${postId}`);
    
          handleGetImages();
        } catch (error) {
          console.error('Error deleting post', error);
        }
      };

      const sortedImages = fetchedImages.sort((a, b) => new Date(b.timeCreated) - new Date(a.timeCreated));

      const [isEditingBio, setIsEditingBio] = useState(false);

      const handleEditBio = () => {
          setIsEditingBio(true);
          setEditedPostContent(userData.description);
      };
  
      const handleSaveBio = async () => {
          try {
              await axios.put('/api/twitter/updateBio', {
                  username: userName,
                  description: editedPostContent,
              });
  
              setIsEditingBio(false);
              setEditedPostContent('');
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
  
                  <div className="userDetailsContainer">
  {userData ? (
    <div>
      <img src={Twitterprofilephoto} alt="Logo" className="profile-photo" />
      <p className="profile-text">Username: {userData.username}</p>
      <p className="profile-text">Full name: {userData.fullname}</p>
      <p className="profile-text">Email Id : {userData.emailId}</p>
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
          <p className="profile-text">
            User Bio : {userData.description}
            {userData.description && (
              <IconButton onClick={handleEditBio}>
                <EditIcon />
              </IconButton>
            )}
          </p>
        </>
      )}
      <p className="profile-text">User since: {calculateJoinDuration()} ago</p>
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