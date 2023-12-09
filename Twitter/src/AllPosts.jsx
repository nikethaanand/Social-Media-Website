import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3500/api/posts/all');
        setPosts(response.data);
        console.log(response.data);
        response.data.forEach(post => {
            console.log("Selected Image:", post.selectedImage);
          });

      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {posts.map(post => (
        <div key={post._id}>
          <h3>{post.username}</h3>
          <p>{post.postContent}</p>
          {post.selectedImage && (
            <div style={{ maxWidth: '300px', margin: 'auto' }}>


              <img
            src={`${post.selectedImage}`}
            alt="Post Image"
                />

             
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AllPosts;

// <img