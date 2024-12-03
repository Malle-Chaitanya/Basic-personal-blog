import React from "react";
import { Link } from "react-router-dom";  // Import Link from react-router-dom
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      
      <div className="navbar-title">Personal Blog</div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>  {/* Replace <a> with <Link> */}
        <li><Link to="/create">Create Post</Link></li>  {/* Replace <a> with <Link> */}
      </ul>
    </nav>
  );
};

export default Navbar;



//