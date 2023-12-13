import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Topbar from '../Navbar/topBar';
import { useParams } from 'react-router-dom';
import Twitterprofilephoto from '../assets/Twitterprofilephoto.png';
import './profile.css';
import moment from 'moment';

const Userprofile = () => {
    const { username } = useParams();
    const [userData, setUserData] = useState(null);
    const [fetchedImages, setFetchedImages] = useState([]);

    async function getuserDetails() {
        try{
        const response = await axios.get(`/api/twitter/user/${username}`);
        setUserData(response.data);
        }
        catch(error)
        {
            console.log(error);
        }

    }


    useEffect(() => {
        getuserDetails()
        handleGetImages();
      }, [username]);

      const handleGetImages = async () => {
        try {
          const response = await axios.get(`/api/posts/user/${username}`);
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


      const calculatepostDuration = (timeCreated) => {
        const postDate = moment(timeCreated);
        const currentDate = moment();
        const duration = moment.duration(currentDate.diff(postDate));
        return duration.humanize();
      };


    return (<>
      <Topbar />
      <div className="container">
        <div className="side-line" />
        <div className="content">
          <div className="nameStyle"> Welcome </div>
          <img src={Twitterprofilephoto} alt="Logo" className="profile-photo" />

          <div className="userDetailsContainer">
                    {userData ? (
                        <div>
                        <p>Username: {userData.username}</p>
                      
                        <p>User since: {calculateJoinDuration()} ago</p>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
</div>



          {fetchedImages.length > 0 ? (
            fetchedImages.map((post, index) => (
              <div key={post._id} className="postContainer">
                <h3>{post.username}</h3>
                <p>{calculatepostDuration(post.timeCreated)} Ago</p>
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
};

export default Userprofile;
