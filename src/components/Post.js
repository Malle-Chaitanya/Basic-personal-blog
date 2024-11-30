import React from "react";
import '../styles/Post.css';

const Post = ({ post, onDelete }) => {
  return (
    <div className="post">
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <button className="delete-button" onClick={() => onDelete(post.id)}>Delete</button>
      <a href={`/update/${post.id}`}>
        <button className="edit-button">Edit</button>
      </a>
    </div>
  );
};

export default Post;
