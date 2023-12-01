import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css'
const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [pokemonListState, setPokemonListState] = useState([]);

  async function getAllTwitterUsers() {
    try{
    const response = await axios.get('http://localhost:3500/api/twitter/all');
    console.log(response.data);
    setPokemonListState(response.data);}
    catch(error)
    {
      console.log(error);
    }
  }
  useEffect(() => {
 
     getAllTwitterUsers();
  }, []);

  const usernameInput = event => {
    const enteredUsername = event.target.value;
    setUsername(enteredUsername);
  }
  
  const passwordInput = event => {
    const enteredPassword = event.target.value;
    setPassword(enteredPassword);
  }



//post method
async function insertUser() {
  const newUser = {
    username: username,
    password: password,
  };

  try {
    const response = await axios.post('http://localhost:3500/api/twitter', newUser);
    console.log(response.data); // Check the response from the server
   
   // await getAllTwitterUsers();
    setPassword('');
    setUsername('');
  } catch (error) {
    console.error("Error creating user:", error);
  }
}



  function submit() {
    insertUser();
  }



  //get method
  async function getallusers() {
    await axios.get('http://localhost:3500/api/twitter/all');
    await getAllTwitterUsers();
  }

  function getuser() {
    getallusers();
  }

  return (
    <>
    <div className='main-div'>
        <h1>Twitter</h1>
        <div className="signIndetails">
          <span>Username: </span><input type='text' value={username} onInput={usernameInput}></input>
        </div>
        <div className="signIndetails">
          <span>Password: </span><input type='text' value={password} onInput={passwordInput}></input>
        </div>
        <button className="twitter-button" onClick={submit}>Create Account/Login</button>
        <button className="twitter-button" onClick={getuser}>Get User details</button>
        
      </div>
  
    </>
  );
};

export default SignIn;
