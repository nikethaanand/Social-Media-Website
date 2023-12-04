import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from './SignIn.jsx'
import HomePage from './Homepage';
import CreatePost from './createPost';
import Layout from './Layout';
import Signup from './signUp';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Layout />}>
          {/* <Route index element={<SignIn />} /> */}
          <Route path="SignIn" element={<SignIn />} />
          <Route path="SignUp" element={<Signup />} />
          <Route path="HomePage" element={<HomePage/>} />
          <Route path="CreatePost" element={<CreatePost/>} />
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
