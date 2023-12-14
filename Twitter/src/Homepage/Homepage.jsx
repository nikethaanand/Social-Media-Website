import React, { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Topbar from '../Navbar/topBar';
import axios from 'axios';
import ImageUploadForm from './input';
import './homepage.css';
import moment from 'moment';
import Allposts from './allposts';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Outlet, Link,useNavigate } from "react-router-dom";
import { Drawer, List, ListItem, ListItemText, Typography,AppBar, Toolbar, Button,IconButton } from '@mui/material';

const HomePage = () => {
  const [userName, setUsername] = useState('');
  const [fetchedImages, setFetchedImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedPostContent, setEditedPostContent] = useState('');

  async function getUsernamefromCookie() {
    try {
      const response = await axios.get('/api/twitter/isLoggedIn');
      if (response.data.username) {
        setUsername(response.data.username);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUsernamefromCookie().then(() => {
      setLoading(false); // Set loading to false after getting the username
    });
  }, []);

  useEffect(() => {
    if (!loading && userName) {
      handleGetImages();
    }
  }, [loading, userName]);

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


  return (
    <>
      <Topbar />
      <div className="container">
        <div className="side-line" />
        <div className="content">
          <div className="nameStyle"> Welcome </div>
          <ImageUploadForm style="createboxstyle" />
          {sortedImages.length > 0 ? (
            sortedImages.map((post, index) => (
              <div key={post._id} className="postContainer">
                <div className="postHeader">
                  <div className="leftContent">
                    {post.username === userName ? (
                      <Link to="/Profile" style={{ textDecoration: 'none', color:'black'}}>
                        <h3>{post.username}</h3>
                      </Link>
                    ) : (
                      <Link to={`/UserProfile/${post.username}`} style={{ textDecoration: 'none',color:'black' }}>
                        <h3>{post.username}</h3>
                      </Link>
                    )}
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
};

export default HomePage;
