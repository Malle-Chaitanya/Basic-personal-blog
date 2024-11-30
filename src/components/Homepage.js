import React, { useState, useEffect } from "react";
import { getPosts, deletePost } from "../services/api";
import Post from "./Post";
import '../styles/Homepage.css';

const Homepage = () => {
  const [posts, setPosts] = useState([]);  // Initialize posts as an empty array

  useEffect(() => {
    // Fetch posts when the component mounts
    const fetchPosts = async () => {
      try {
        const response = await getPosts();  // Fetch posts from the API
        setPosts(response || []);  // Ensure posts is an array
      } catch (error) {
        console.error("Error fetching posts:", error);
        alert("Failed to fetch posts");
      }
    };

    fetchPosts();
  }, []);  // Empty dependency array ensures this runs once on component mount

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(id);
        // After deleting, fetch posts again to refresh the list
        const response = await getPosts();
        setPosts(response.data || []);  // Ensure posts is an array
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  return (
    <div>
      <h2>Welcome to My Blog </h2>
      <div className="posts-container"> {/* Wrap posts in the container */}
        {Array.isArray(posts) && posts.length > 0 ? (  // Add check to ensure posts is an array
          posts.map((post) => (
            <Post key={post.id} post={post} onDelete={handleDelete} />
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </div>
  );
};

export default Homepage;
