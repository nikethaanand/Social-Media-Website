import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Navbar from './Navbar';
import Topbar from './Topbar';
import CreatePost from './CreatePost';

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Topbar />
      <h1>Welcome</h1>
      <CreatePost style="createboxstyle" />
    </>
  );
};

export default HomePage;
