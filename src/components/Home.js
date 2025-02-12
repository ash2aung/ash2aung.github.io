// src/components/Home.js
import React from 'react';
import '../styles/Home.css';
import profilePic from '../assets/profile.jpg'; 

function Home() {
  return (
    <div className="home">
        <div className="home-container">
        <img src={profilePic} alt="Ash Aung" className="profile-pic" />
      <h1>Welcome to My Portfolio</h1>
      <p>Hi! I'm Ash Aung, a passionate software developer specializing in modern web technologies.</p>  {/* Updated: Welcome message */}
        <p>Explore my projects and skills to learn more about my work.</p>  {/* New: Added description */}
      </div>
    </div>
  );
}

export default Home;