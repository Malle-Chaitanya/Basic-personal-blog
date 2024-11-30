import React from 'react';
import { Route, Routes } from 'react-router-dom';  // Import Routes and Route components
import Navbar from './components/Navbar';  // Import Navbar
import Homepage from './components/Homepage';  // Import Homepage component
import PostForm from './components/PostForm';  // Import Create Post form component
import Footer from './components/Footer'; 

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />  {/* Define route for homepage */}
        
        <Route path="/create" element={<PostForm />} />  {/* Define route for create post */}
        <Route path="/update/:id" element={<PostForm />} /> {/* Update post */}
      </Routes>
      <Footer />
    </div>
  );
};

export default App;


