import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./styles/index.css";

// Components
function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <Link to="/" className="logo">Ash Aung</Link>
        <div className="nav-links">
          <Link to="/projects">Projects</Link>
          <Link to="/skills">Skills</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Ash Aung. All rights reserved.</p>
      <div className="social-links">
        <a href="https://github.com/ash2aung" target="_blank">GitHub</a>
        <a href="https://linkedin.com/in/ash2aung" target="_blank">LinkedIn</a>
      </div>
    </footer>
  );
}

function Home() {
  return (
    <section className="home">
      <h1>Welcome to My Portfolio</h1>
      <p>Hi! I'm Ash Aung, a software developer specializing in modern web technologies.</p>
    </section>
  );
}

function Projects() {
  const projects = [
    { title: "Portfolio Website", desc: "A portfolio website using React.", link: "#" },
    { title: "Weather App", desc: "Weather forecasting app using OpenWeather API.", link: "#" },
    { title: "Task Manager", desc: "Task management app built with React.", link: "#" }
  ];
  return (
    <section className="projects">
      <h1>My Projects</h1>
      <div className="projects-list">
        {projects.map((project, idx) => (
          <div key={idx} className="project-card">
            <h2>{project.title}</h2>
            <p>{project.desc}</p>
            <a href={project.link} target="_blank">View Project</a>
          </div>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  const skills = ["HTML", "CSS", "JavaScript", "React", "Python", "C++", "C", "Java"];
  return (
    <section className="skills">
      <h1>My Skills</h1>
      <ul>
        {skills.map((skill, idx) => (
          <li key={idx}>{skill}</li>
        ))}
      </ul>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact">
      <h1>Contact Me</h1>
      <p>Email: <a href="mailto:ash2aung@example.com">ash2aung@example.com</a></p>
      <p>LinkedIn: <a href="https://linkedin.com/in/ash2aung" target="_blank">LinkedIn</a></p>
    </section>
  );
}

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
