import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import '../styles/Experience.css';

const experiences = [
  {
    id: 1,
    position: 'Position Title',
    organization: 'Organization Name',
    duration: 'Sept 2023 - Present',
    summary: 'Brief description of what you do in this role.',
    details: [
      'Detailed responsibility or achievement #1',
      'Detailed responsibility or achievement #2',
      'Detailed responsibility or achievement #3',
    ],
  },
  {
    id: 2,
    position: 'Another Position',
    organization: 'Another Organization',
    duration: 'Jan 2022 - Aug 2023',
    summary: 'Brief description of what you did in this role.',
    details: [
      'Detailed responsibility or achievement #1',
      'Detailed responsibility or achievement #2',
    ],
  },
  {
    id: 3,
    position: 'Third Position',
    organization: 'Third Organization',
    duration: 'Sept 2021 - Dec 2021',
    summary: 'Brief description of what you did in this role.',
    details: [
      'Detailed responsibility or achievement #1',
      'Detailed responsibility or achievement #2',
      'Detailed responsibility or achievement #3',
    ],
  },
];

function Experience() {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="experience-section" id="experience">
      <div className="experience-container">
        <div className="experience-header">
          <h2>Experience</h2>
          <p>Community positions and leadership roles I've held.</p>
        </div>

        <div className="experience-list">
          {experiences.map((exp) => {
            const isExpanded = expandedId === exp.id;
            
            return (
              <div 
                key={exp.id} 
                className={`experience-card ${isExpanded ? 'expanded' : ''}`}
                onClick={() => toggleExpand(exp.id)}
              >
                <div className="experience-card-header">
                  <div className="experience-card-info">
                    <h3>{exp.position}</h3>
                    <span className="experience-org">{exp.organization}</span>
                    <p className="experience-summary">{exp.summary}</p>
                  </div>
                  <ChevronDown 
                    className={`expand-icon ${isExpanded ? 'rotated' : ''}`} 
                    size={20} 
                  />
                </div>
                
                <div className={`experience-card-details ${isExpanded ? 'show' : ''}`}>
                  <span className="experience-duration">{exp.duration}</span>
                  <ul>
                    {exp.details.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Experience;

