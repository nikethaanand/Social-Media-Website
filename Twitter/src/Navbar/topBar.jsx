import React, { useState, useEffect } from 'react';
import { Drawer, List, ListItem, ListItemText, Typography,AppBar, Toolbar, Button, } from '@mui/material';
import twitterLogo from '../assets/twitterLogo.jpeg';
import '../styles.css';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'; 
import Profile from '../userprofile/Profile';
import HomePage from '../Homepage/Homepage';

const Topbar = () => {
  const [userName, setUsername] = useState('');

  const logOut = async () => {
    try {
      await axios.post('/api/twitter/logout', {});
      navigate('/SignIn');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  useEffect(() => {
    getUsernamefromCookie();
    
  }, []);

  const profile = async () => {
    try {
     // await axios.post('/api/twitter/logout', {});
      navigate('/Profile');
    } catch (error) {
      console.error('Error going to profile page', error);
    }
  };

  const home = async () => {
    try {
     // await axios.post('/api/twitter/logout', {});
      navigate('/HomePage');
    } catch (error) {
      console.error('Error going to profile page', error);
    }
  };

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

  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1da0f2' }}>
      <Toolbar>
      <ListItem button>
          <img src={twitterLogo} alt="Logo" className="Twitter-logo" />
          <h4 style={{marginLeft:"15px"}}> Welcome  {userName}!</h4>
        </ListItem>
      
      <ListItem button onClick={home}>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={profile}>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button onClick={logOut}>
          <ListItemText primary="Logout" />
         

        </ListItem>
       

        {/* Search bar */}
        {/* <TextField
          id="search"
          label="Search"
          variant="outlined"
          size="small"
          sx={{ marginRight: 2, backgroundColor: 'white', borderRadius: '4px' }}
          InputProps={{
            style: { color: '#1da0f2', fontWeight: 'bold' },
          }}
        /> */}

        {/* Other buttons or components can be added here */}
        {/* <Button color="inherit">Login</Button> */}
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
