import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import profileImage from "../assets/profile.jpg";

function Home() {
  return (
    <section className="home-container">
      <div className="home-content">
        <div className="left-content">
          <p className="intro-text">
            I'm a second year Software Systems student at Simon Fraser University.
          </p>
          <hr className="divider" />
          <div className="social-links">
            <a href="https://github.com/ash2aung" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://linkedin.com/in/ash2aung" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="mailto:hwa201@sfu.ca">Email</a>
          </div>
        </div>
        <div className="profile-image-container">
          <img src={profileImage} alt="Ash Aung" className="profile-image" />
          <div className="name-container">
            <h1 className="name">Ash Aung</h1>
            <p className="nickname">(but you can call me Ash)</p>
          </div>
        </div>
      </div>
      <div className="navigation-buttons">
        <Link to="/about" className="nav-button">About Me</Link>
        <Link to="/projects" className="nav-button">Projects</Link>
        <Link to="/skills" className="nav-button">Skills</Link>
        <Link to="/contact" className="nav-button">Contact</Link>
      </div>
    </section>
  );
}

export default Home;