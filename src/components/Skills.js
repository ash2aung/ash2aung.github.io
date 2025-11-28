import React from 'react';
import { Code, Server, Wrench, Palette } from 'lucide-react';

const skillCategories = [
  {
    title: "Frontend",
    icon: <Code size={20} />,
    skills: ["React", "HTML5", "CSS3", "JavaScript", "TypeScript", "Tailwind"]
  },
  {
    title: "Backend",
    icon: <Server size={20} />,
    skills: ["Python", "Node.js", "C++", "C", "Java"]
  },
  {
    title: "Tools",
    icon: <Wrench size={20} />,
    skills: ["Git", "VS Code", "IntelliJ", "PyCharm"]
  },
  {
    title: "Design",
    icon: <Palette size={20} />,
    skills: ["Figma", "Photoshop", "Canva"]
  }
];

function Skills() {
  return (
    <div className="container section">
      <h2 className="h2">Skills & Expertise</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
        {skillCategories.map((cat, idx) => (
          <div key={idx} className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: 'hsl(var(--primary))' }}>
              {cat.icon}
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>{cat.title}</h3>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {cat.skills.map(skill => (
                <span key={skill} className="badge badge-secondary" style={{ fontWeight: 400 }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skills;