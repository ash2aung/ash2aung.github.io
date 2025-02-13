// src/components/Skills.js
import React from 'react';
import { Code, Server, Wrench, Brain, Paintbrush, Briefcase } from 'lucide-react';
import '../styles/Skills.css';

const skills = [
  {
    category: 'Frontend Development',
    icon: <Code size={24} />,
    description: 'Building responsive and interactive user interfaces',
    skills: [
      { name: 'HTML5', level: 'Intermediate', percentage: 70 },
      { name: 'CSS3', level: 'Intermediate', percentage: 63 },
      { name: 'JavaScript', level: 'Intermediate', percentage: 62 },
      { name: 'React', level: 'Intermediate', percentage: 65 },
      { name: 'TypeScript', level: 'Intermediate', percentage: 50 }
    ]
  },
  {
    category: 'Backend Development',
    icon: <Server size={24} />,
    description: 'Creating robust server-side applications',
    skills: [
      { name: 'Python', level: 'Advanced', percentage: 90 },
      { name: 'Node.js', level: 'Intermediate', percentage: 65 },
      { name: 'C++', level: 'Advanced', percentage: 85 },
      { name: 'C', level: 'Intermediate', percentage: 70 },
      { name: 'Java', level: 'Beginner', percentage: 40 }
    ]
  },
  {
    category: 'Tools & Technologies',
    icon: <Wrench size={24} />,
    description: 'Development tools and technologies',
    skills: [
      { name: 'Git', level: 'Beginner', percentage: 50 },
      { name: 'VsCode', level: 'Advanced', percentage: 80 },
      { name: 'IntelliJ', level: 'Beginner', percentage: 40 },
      { name: 'PyCharm', level: 'Intermediate', percentage: 60 }
    ]
  },
  {
    category: 'Design Tools',
    icon: <Paintbrush size={24} />,
    description: 'Creative design and prototyping tools',
    skills: [
      { name: 'Canva', level: 'Advanced', percentage: 85 },
      { name: 'Photoshop', level: 'Intermediate', percentage: 65 },
      { name: 'Figma', level: 'Beginner', percentage: 45 }
    ]
  }
];

const experiences = [
  {
    title: 'Work Experience',
    items: [
      {
        role: 'Director of Internal Relations',
        organization: 'Software Systems Student Society',
        period: '2024-current',
        current: true
      },
      {
        role: 'Cashier',
        organization: 'Stationery Store',
        period: '2016-2023'
      },
      {
        role: 'Salesman',
        organization: 'Snack Shop',
        period: '2015-2020'
      }
    ]
  },
  {
    title: 'Volunteer Experience',
    items: [
      {
        role: 'English and Math Tutor',
        organization: 'Church',
        period: '2022'
      },
      {
        role: 'Elder Care Assistant',
        organization: 'Retirement Home',
        period: '2022'
      }
    ]
  }
];

function Skills() {
  return (
    <div className="skills">
      <div className="skills-header">
        <h1 className="skills-title">
          <Brain className="skills-title-icon" size={32} />
          Technical Skills
        </h1>
        <p className="skills-subtitle">
          A comprehensive overview of my technical expertise and proficiency levels
        </p>
      </div>

      <div className="skills-grid">
        {skills.map((category, index) => (
          <div key={index} className="skill-category">
            <div className="category-header">
              <div className="category-icon">{category.icon}</div>
              <h2>{category.category}</h2>
            </div>
            <p className="category-description">{category.description}</p>

            <div className="skills-list">
              {category.skills.map((skill, idx) => (
                <div key={idx} className="skill-item">
                  <div className="skill-info">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-level">{skill.level}</span>
                  </div>
                  <div className="skill-bar-container">
                    <div
                      className="skill-bar"
                      style={{ width: `${skill.percentage}%` }}
                    >
                      <span className="skill-percentage">{skill.percentage}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Experience Section */}
      <div className="experience-section">
        <h2 className="experience-title">
          <Briefcase size={24} /> Experience
        </h2>

        {experiences.map((section, index) => (
          <div key={index} className="experience-category">
            <h3>{section.title}</h3>
            <div className="experience-list">
              {section.items.map((item, idx) => (
                <div key={idx} className="experience-item">
                  <div className="experience-details">
                    <span className="experience-role">{item.role}</span>
                    <span className="experience-org">{item.organization}</span>
                  </div>
                  <span className="experience-period">{item.period}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skills;
