import React, { useState, useEffect, useCallback } from "react";
import { createPost, updatePost, getPostById } from "../services/api";
import { useParams, useNavigate } from "react-router-dom";  // useNavigate for redirection
import '../styles/PostForm.css';

const PostForm = () => {
  const { id } = useParams();  
  const navigate = useNavigate(); 
  const [post, setPost] = useState({ title: "", content: "" });  
  const [isEdit, setIsEdit] = useState(false);  
  const [loading, setLoading] = useState(false);  

  
  const fetchPost = useCallback(async () => {
    setLoading(true);  
    try {
      const response = await getPostById(id); 
      setPost(response || { title: "", content: "" });  
      setIsEdit(true); 
    } catch (error) {
      console.error("Error fetching post:", error);
      alert("Failed to fetch post.");
    } finally {
      setLoading(false);  // End loading
    }
  }, [id]);  

  
  useEffect(() => {
    if (id) {
      fetchPost();  
    }
  }, [id, fetchPost]);  

  const handleSubmit = async (e) => {
    e.preventDefault();  
    if (!post.title || !post.content) {
      alert("Both title and content are required.");
      return;
    }

    setLoading(true);
    try {
      if (isEdit) {
        await updatePost(id, post);  
        alert("Post updated successfully");
      } else {
        await createPost(post);  
        alert("Post created successfully");
      }
      setPost({ title: "", content: "" }); 
      navigate("/");  
    } catch (error) {
      console.error("Error submitting post:", error);
      alert("Failed to submit post.");
    } finally {
      setLoading(false);  
    }
  };

 
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isEdit ? "Edit Post" : "Create Post"}</h2>
      <input
        type="text"
        placeholder="Title"
        value={post?.title || ""}  
        onChange={(e) => setPost({ ...post, title: e.target.value })} 
        required
      />
      <textarea
        placeholder="Content"
        value={post?.content || ""}  
        onChange={(e) => setPost({ ...post, content: e.target.value })}  
        required
      ></textarea>
      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : isEdit ? "Update Post" : "Create Post"}
      </button>
    </form>
  );
};

export default PostForm;
