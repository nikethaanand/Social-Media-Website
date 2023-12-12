import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from './Login/signIn'
import HomePage from './Homepage/Homepage';
import Layout from './Layout';
import Signup from './Signup/signUp';
import Profile from './userprofile/Profile';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Layout />}>
          <Route index element={<SignIn />} />
          <Route path="SignIn" element={<SignIn />} />
          <Route path="SignUp" element={<Signup />} />
          <Route path="Profile" element={<Profile />} />
          {/* <Route path="/HomePage/:username" element={<HomePage />} /> */}
          <Route path="HomePage" element={<HomePage/>} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
