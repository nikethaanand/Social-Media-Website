import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3500/api/posts/all');
        setPosts(response.data);
        console.log('Posts:', response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {posts.length === 0 ? (
        <p>Loading...</p>
      ) : (
        posts.map(post => (
          <div key={post._id}>
            <h3>{post.username}</h3>
            <p>{post.postContent}</p>
            {post.selectedImage ? (
              <div style={{ maxWidth: '300px', margin: 'auto' }}>
<img
  src={`data:image/jpeg;base64,${post.selectedImage}`}
  alt="Post Image"
  style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
  onError={(e) => {
    console.error('Error loading image:', e);
    // console.log('Image source:', `data:image/jpeg;base64,${post.selectedImage}`);
    console.log('post:', post); // Add this line for additional debugging
  }}
/>
              </div>
            ) : (
              <p>No image available</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default AllPosts;