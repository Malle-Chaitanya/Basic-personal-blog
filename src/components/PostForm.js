import React, { useState, useEffect, useCallback } from "react";
import { createPost, updatePost, getPostById } from "../services/api";
import { useParams, useNavigate } from "react-router-dom";  // useNavigate for redirection
import '../styles/PostForm.css';

const PostForm = () => {
  const { id } = useParams();  // Get the post ID from the URL parameters
  const navigate = useNavigate();  // Initialize navigate for redirection
  const [post, setPost] = useState({ title: "", content: "" });  // Initialize state for the post data
  const [isEdit, setIsEdit] = useState(false);  // Flag to check if we are in "edit" mode
  const [loading, setLoading] = useState(false);  // Loading state to show while fetching/updating

  // Memoize the fetchPost function to avoid unnecessary re-renders
  const fetchPost = useCallback(async () => {
    setLoading(true);  // Start loading while fetching
    try {
      const response = await getPostById(id);  // Fetch the post data by ID
      setPost(response || { title: "", content: "" });  // Populate state with fetched data
      setIsEdit(true);  // Set to "edit" mode after fetching data
    } catch (error) {
      console.error("Error fetching post:", error);
      alert("Failed to fetch post.");
    } finally {
      setLoading(false);  // End loading
    }
  }, [id]);  // Dependency on id so it fetches whenever the ID changes

  // Fetch the post data for editing when the component mounts or when the ID changes
  useEffect(() => {
    if (id) {
      fetchPost();  // Call fetchPost to retrieve the data
    }
  }, [id, fetchPost]);  // Dependencies: id and fetchPost

  // Handle form submission (both create and update)
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent default form submission
    if (!post.title || !post.content) {
      alert("Both title and content are required.");
      return;
    }

    setLoading(true);  // Start loading during submission
    try {
      if (isEdit) {
        await updatePost(id, post);  // Call the API to update the post
        alert("Post updated successfully");
      } else {
        await createPost(post);  // Call the API to create the post
        alert("Post created successfully");
      }
      setPost({ title: "", content: "" });  // Reset the form after submission
      navigate("/");  // Redirect to the homepage or posts list
    } catch (error) {
      console.error("Error submitting post:", error);
      alert("Failed to submit post.");
    } finally {
      setLoading(false);  // End loading
    }
  };

  // If loading, display a loading message
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isEdit ? "Edit Post" : "Create Post"}</h2>
      <input
        type="text"
        placeholder="Title"
        value={post?.title || ""}  // Use existing title or an empty string
        onChange={(e) => setPost({ ...post, title: e.target.value })}  // Update title in state
        required
      />
      <textarea
        placeholder="Content"
        value={post?.content || ""}  // Use existing content or an empty string
        onChange={(e) => setPost({ ...post, content: e.target.value })}  // Update content in state
        required
      ></textarea>
      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : isEdit ? "Update Post" : "Create Post"}
      </button>
    </form>
  );
};

export default PostForm;
