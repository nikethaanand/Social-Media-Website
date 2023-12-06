import './index.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';
import twitterLogo from './assets/twitterLogo.jpeg';
import { Outlet, Link,useNavigate } from "react-router-dom";

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [emailId, setEmailId] = useState('');
    const [fullname, setFullName] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [emailIdError, setemailIdError] = useState(false);
    const [fullnameError, setfullnameError] = useState('');

    const [validation, setValidation] = useState(false);
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
    const emailIdInput = (event) => {
        const enteredemailId = event.target.value;
        setEmailId(enteredemailId);
        setemailIdError(false); // Reset error when user types
      };
      const fullnameInput = (event) => {
        const enteredfullname = event.target.value;
        setFullName(enteredfullname);
        setfullnameError(false); // Reset error when user types
      };
  
    const validateInputs = () => {
      let isValid = true;
  
      if (username.trim() === '') {
        setUsernameError(true);
        isValid = false;
      }
      if (fullname.trim() === '') {
        setfullnameError(true);
        isValid = false;
      }
  
      if (password.trim() === '') {
        setPasswordError(true);
        isValid = false;
      }
      if (emailId.trim() === '') {
        setemailIdError(true);
        isValid = false;
      }
  
      return isValid;
    };
  
    async function insertUser() {
      if (!validateInputs()) {
        return; // Stop if inputs are not valid
      }
  
      const newUser = {
        username: username,
        password: password,
        emailId:emailId,
        fullname:fullname
      };
  
      try {
        
        const response = await axios.post('http://localhost:3500/api/twitter', newUser);
        console.log(response.data);
        navigate('/HomePage');
        setValidation(true);
        setPassword('');
        setUsername('');
        setFullName('');
        setEmailId('');
      } catch (error) {
        console.error("Error creating user:", error);
      }
    }
  
    function submit() {
      insertUser();
      // if(validation)
      // {
      //   navigate('/HomePage');
      // }

    }
  
    async function getallusers() {
      await axios.get('http://localhost:3500/api/twitter/all');
      await getAllTwitterUsers();
    }
  
    function getuser() {
      getallusers();
    }
  
    return (
      <div className="main-container">
        <div className="left"></div>
        <div className="right">
          <div className="main-div">
            <img src={twitterLogo} alt="Logo" className="Twitter-logo" />
            <h1>Join Twitter Today</h1>
            <div className={`signIndetails ${fullnameError ? 'error' : ''}`}>
        <input type="text" value={fullname} onInput={fullnameInput} placeholder="Enter Full name" />
     {fullnameError && <div className="error-label">Enter full name</div>}
         </div>
         <div className={`signIndetails ${emailIdError ? 'error' : ''}`}>
        <input type="email" value={emailId} onInput={emailIdInput} placeholder="Enter Email Id" />
     {emailIdError && <div className="error-label">Enter valid email Id</div>}
         </div>

            <div className={`signIndetails ${usernameError ? 'error' : ''}`}>
            <input type="text" value={username} onInput={usernameInput} placeholder="Enter username" />
            {usernameError && <div className="error-label">Enter a value for username</div>}
            </div>
  
  <div className={`signIndetails ${passwordError ? 'error' : ''}`}>
    <input type="text" value={password} onInput={passwordInput} placeholder="Enter password" />
    {passwordError && <div className="error-label">Enter a value for password</div>}
  </div>
  
            <button className="twitter-button" onClick={submit}>
              Register User
            </button>
            <div className="button-container">
            <Link to="/SignIn">
              <button className="button-link">Sign In</button>
              </Link>
              {/* <button className="button-link" > Forgot Password?</button> */}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
export default Signup;
