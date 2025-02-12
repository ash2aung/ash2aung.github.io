// src/components/Projects.js
import React from 'react';
import '../styles/Projects.css';

const projects = [
  {
    title: 'Portfolio Website',
    description: 'A personal portfolio website to showcase my projects and skills.',
    link: 'https://github.com/ash2aung/ash2aung.github.io'
  },
  {
    title: 'Weather App',
    description: 'A weather forecasting app using OpenWeather API.',
    link: 'https://github.com/ash2aung/weather-app'
  },
  {
    title: 'Task Manager',
    description: 'A simple task management app built with React.',
    link: 'https://github.com/ash2aung/task-manager'
  }
];

function Projects() {
  return (
    <div className="projects">
      <div className="projects-list">  {/* New: Added projects list container */}
        {projects.map((project, index) => (
          <div key={index} className="project-card">  {/* New: Added project card */}
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              View on GitHub
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;