import React from 'react';
import { AppBar, Toolbar, Typography, Button, TextField } from '@mui/material';

const Topbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#1da0f2' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', color: 'white' }}>
          Your Logo
        </Typography>

        {/* Search bar */}
        <TextField
          id="search"
          label="Search"
          variant="outlined"
          size="small"
          sx={{ marginRight: 2, backgroundColor: 'white', borderRadius: '4px' }}
          InputProps={{
            style: { color: '#1da0f2', fontWeight: 'bold' },
          }}
        />

        {/* Other buttons or components can be added here */}
        {/* <Button color="inherit">Login</Button> */}
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
