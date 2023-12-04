import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';
import twitterLogo from './assets/twitterLogo.jpeg';
import { Outlet, Link,useNavigate } from "react-router-dom";
 
const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordValueCheck, setpasswordValueCheck] = useState([]);
  const [validationsuccess, setvalidationsuccess] = useState(false);
  const navigate = useNavigate();

  const usernameInput = (event) => {
    const enteredUsername = event.target.value;
    setUsername(enteredUsername);
    setUsernameError(false); // Reset error when user types
  };

  const passwordInput = (event) => {
    const enteredPassword = event.target.value;
    setPassword(enteredPassword);
    setPasswordError(false); // Reset error when user types
  };

  const validateInputs = () => {
    let isValid = true;

    if (username.trim() === '') {
      setUsernameError(true);
      isValid = false;
    }

    if (password.trim() === '') {
      setPasswordError(true);
      isValid = false;
    }

    return isValid;
  };

  // async function insertUser() {
  //   if (!validateInputs()) {
  //     return; // Stop if inputs are not valid
  //   }
  // }

  async function getPassword() {
    try {
      const response = await axios.get(`http://localhost:3500/api/twitter/${username}`);
      setpasswordValueCheck(response.data);
      console.log(response.data); // Move the console.log here to ensure it runs after the state is updated
    } catch (error) {
      console.error("Error getting user password:", error);
    }
  }
  
  async function signup() {
    if (!validateInputs()) {
      return; // Stop if inputs are not valid
    }
    await getPassword();
    if(passwordValueCheck===password)
    {
      setvalidationsuccess(true);
      console.log("can move to next page");
      navigate('/HomePage');  
    }
    else
    {
      setvalidationsuccess(false);
      console.log("not equal");
    }
     // Wait for the getPassword function to complete
  }
  

  return (
    <div className="main-container">
      <div className="left"></div>
      <div className="right">
        <div className="main-div">
          <img src={twitterLogo} alt="Logo" className="Twitter-logo" />
          <h1>Log in to Twitter</h1>
          <div className={`signIndetails ${usernameError ? 'error' : ''}`}>
            <input type="text" value={username} onInput={usernameInput} placeholder="Enter username" />
            {usernameError && <div className="error-label">Enter a value for username</div>}
          </div>

          <div className={`signIndetails ${passwordError ? 'error' : ''}`}>
            <input type="text" value={password} onInput={passwordInput} placeholder="Enter password" />
            {passwordError && <div className="error-label">Enter a value for password</div>}
          </div>
            
          <button className="twitter-button" onClick={signup}>
            Login
          </button>
          <div className="button-container">
          <Link to="/SignUp">
            <button className="button-link">Sign up for Twitter</button>
            </Link>
            <button className="button-link" > Forgot Password?</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
