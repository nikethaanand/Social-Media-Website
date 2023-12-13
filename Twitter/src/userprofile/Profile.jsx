
import React, { useEffect, useState } from 'react';
import Topbar from '../Navbar/topBar';
import Twitterprofilephoto from '../assets/Twitterprofilephoto.png';
import axios from 'axios';
import './profile.css';
import moment from 'moment';

export default function Profile() {

    const [userName, setUsername] = useState('');
    const [fetchedImages, setFetchedImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);

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
    async function getuserDetails() {
        try{
        const response = await axios.get(`/api/twitter/user/${userName}`);
        setUserData(response.data);
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
        getuserDetails();
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
    const calculateJoinDuration = () => {
        if (userData && userData.timeCreated) {
          const joinDate = moment(userData.timeCreated);
          const currentDate = moment();
          const duration = moment.duration(currentDate.diff(joinDate));
          return duration.humanize();
        }
        return 'Unknown';
      };
    return (<>

    <Topbar />
     

      <div className="container">
        <div className="side-line" />
        <div className="content">
          <div className="nameStyle"> Welcome </div>
          <img src={Twitterprofilephoto} alt="Logo" className="profile-photo" />

                            <div>
                        {userData ? (
                            <div>
                            <p>Username: {userData.username}</p>
                            <p>Full name: {userData.fullname}</p>
                            <p>Email Id : {userData.emailId}</p>
                            <p>User since: {calculateJoinDuration()} ago</p>
                    
                            </div>
                        ) : (
                            <p></p>
                        )}
                        </div>



          {fetchedImages.length > 0 ? (
            fetchedImages.map((post, index) => (
              <div key={post._id} className="postContainer">
                <h3>{post.username}</h3>
                <p className="postContent">{post.postContent}</p>
                {post.selectedImage ? (
                  <div className="imageContainer">
                    <img
                      src={`data:image/jpeg;base64,${post.selectedImage}`}
                      alt="Post Image"
                      className="postImage"
                    />
                  </div>
                ) : null}
                {index < fetchedImages.length - 1 && <hr className="horizontalLine" />}
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className="side-line" />
      </div>





    </>
        );
    }