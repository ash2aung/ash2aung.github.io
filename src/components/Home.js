import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import profileImage from "../assets/profile.jpg";
import resume from "../assets/resume.pdf"; // Import the resume

function Home() {
  return (
    <section className="home-container">
      <div className="home-content">
        <div className="left-content">
          <p className="intro-text">
            Hi, I'm Ash. I'm a second year Software Systems student at Simon Fraser University. Welcome to my Portfolio!
          </p>
          <ul className="intro-list">
            <li>
              Learn more about me <Link to="/about" className="intro-button">Here</Link>
            </li>
            <li>
              Here're some of my <Link to="/projects" className="intro-button">Projects</Link>
            </li>
            <li>
              View my skills and experience <Link to="/skills" className="intro-button">Here</Link>
            </li>
            <li>
              Here're my <Link to="/contact" className="intro-button">Contacts</Link>
            </li>
            <li>
              Download my resume <a href={resume} className="intro-button" download>Here</a>
            </li>
          </ul>
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
            <h1 className="name">Htet Wai Yan Aung</h1>
            <p className="nickname">(but most people call me Ash)</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;