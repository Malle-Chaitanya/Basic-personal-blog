import React from 'react';
import { Route, Routes } from 'react-router-dom';  
import Navbar from './components/Navbar';  
import Homepage from './components/Homepage';  
import PostForm from './components/PostForm'; 
import Footer from './components/Footer'; 

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />  
        
        <Route path="/create" element={<PostForm />} />  
        <Route path="/update/:id" element={<PostForm />} /> 
      </Routes>
      <Footer />
    </div>
  );
};

export default App;


