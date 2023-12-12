
import React, { useEffect, useState } from 'react';
import Topbar from '../Navbar/topBar';
import Twitterprofilephoto from '../assets/Twitterprofilephoto.png';
import axios from 'axios';
import './profile.css';
export default function Profile() {

    const [userName, setUsername] = useState('');
    const [fetchedImages, setFetchedImages] = useState([]);
    const [loading, setLoading] = useState(true);
  
    async function getUsernamefromCookie() {
      try{
      const response = await axios.get('/api/twitter/isLoggedIn')
      if(response.data.username) {
        setUsername(response.data.username)
      }
    }
    catch(error)
    {
      console.log(error);
    }
    }
  
  
    useEffect(() => {
      getUsernamefromCookie().then(() => {
        setLoading(false); // Set loading to false after getting the username
      });
    }, []);
  
    useEffect(() => {
      if (!loading) {
        handleGetImages();
      }
    }, [loading,userName]);
  
    // let usernameMessage = <div>Loading...</div>
    // if(userName) {
    //   usernameMessage = <div>Logged in as {userName}</div>
    // }
  
    const handleGetImages = async () => {
      try {
        const response = await axios.get(`/api/posts/user/${userName}`);
        setFetchedImages(response.data);
      } catch (error) {
        console.error('Error fetching images', error);
      }
    };

    return (<>

    <Topbar />
      <img src={Twitterprofilephoto} alt="Logo" className="profile-photo" />


      {fetchedImages.length > 0 ? (
        fetchedImages.map((post) => (
          <div key={post._id} style={{marginLeft:"250px"}}>
            <h3>{post.username}</h3>
            <p>{post.postContent}</p>
            {post.selectedImage ? (
              <div style={{ maxWidth: '300px', margin: 'auto' }}>
                <img
                  src={`data:image/jpeg;base64,${post.selectedImage}`}
                  alt="Post Image"
                  style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
                />
              </div>
            ) : null}
          </div>
        ))
      ) : (
        <p>Loading...</p>
)}
    </>
        );
    }