import React, { useState, useEffect } from 'react';
import { Drawer, List, ListItem, ListItemText, Typography } from '@mui/material';
import { styled } from '@mui/system';
import twitterLogo from './assets/twitterLogo.jpeg';
import './styles.css';
import axios from 'axios'; // Add this line
import { useNavigate } from 'react-router-dom'; // Assuming you are using react-router-dom

const drawerWidth = '50%';

const StyledDrawer = styled(Drawer)({
  width: drawerWidth,
  flexShrink: 0,
});

const StyledList = styled(List)({
  width: drawerWidth,
});

const Navbar = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  // useEffect(() => {
  //   async function getUsername() {
  //     try {
      
  //       if (response.data.username) {
  //         setUsername(response.data.username);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching username:', error);
  //     }
  //   }

  //   getUsername();
  // }, []);

  const logOut = async () => {
    try {
      await axios.post('http://localhost:3500/api/twitter/logout', {});
      navigate('/SignIn');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <StyledDrawer variant="permanent" anchor="left">
      <StyledList>
        <ListItem button>
          <img src={twitterLogo} alt="Logo" className="Twitter-logo" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button onClick={logOut}>
          <ListItemText primary="Logout" />
        </ListItem>
      </StyledList>
    </StyledDrawer>
  );
};

export default Navbar;
