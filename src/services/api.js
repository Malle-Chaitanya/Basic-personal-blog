import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000"; // Backend URL

// Fetch all posts
export const getPosts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/posts`);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

// Fetch a single post by ID
export const getPostById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
};

// Create a new post
// Create a new post (with query parameters)
export const createPost = async (postData) => {
  try {
    // Convert the postData object to a query string
    const queryParams = new URLSearchParams(postData).toString();

    // Send the POST request with the query string in the URL and no body
    const response = await axios.post(`${API_BASE_URL}/posts?${queryParams}`, null, {
      headers: { "accept": "application/json" },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};


// Update an existing post
// Update an existing post (using query parameters)
export const updatePost = async (id, postData) => {
  try {
    // Convert the postData object to a query string
    const queryParams = new URLSearchParams(postData).toString();

    // Send the PUT request with the query string in the URL
    const response = await axios.put(`${API_BASE_URL}/posts/${id}?${queryParams}`, null, {
      headers: { "accept": "application/json" },
    });

    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      console.error("API validation error:", error.response.data);
      alert(`Failed to update post: ${error.response.data.message}`);
    } else {
      console.error("Error updating post:", error);
      alert("Failed to update post.");
    }
    throw error;
  }
};


// Delete a post by ID
export const deletePost = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};
//