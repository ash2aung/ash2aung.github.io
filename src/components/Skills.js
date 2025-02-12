// src/components/Skills.js
import React from 'react';
import '../styles/Skills.css';

const skills = [
  {
    category: 'Frontend Development',
    skills: [
      { name: 'HTML', level: 'Advanced' },
      { name: 'CSS', level: 'Advanced' },
      { name: 'JavaScript', level: 'Advanced' },
      { name: 'React', level: 'Advanced' }
    ]
  },
  {
    category: 'Backend & Programming Languages',
    skills: [
      { name: 'Python', level: 'Advanced' },
      { name: 'C++', level: 'Advanced' },
      { name: 'C', level: 'Advanced' },
      { name: 'Java', level: 'Intermediate' }
    ]
  }
];

function Skills() {
  return (
    <div className="skills">
      <h1>My Skills</h1>
      <div className="skills-container"></div>
      {skills.map((group, index) => (
          <div key={index} className="skills-category">  {/* New: Added skills category */}
            <h2>{group.category}</h2>
            <ul>
              {group.skills.map((skill, idx) => (
                <li key={idx}>
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-level">{skill.level}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
}

export default Skills;