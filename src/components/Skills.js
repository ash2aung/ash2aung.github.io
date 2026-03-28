import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Skills.css';

// Skill groups matching the prototype
const skillGroups = [
  {
    label: 'Languages',
    skills: ['JavaScript', 'TypeScript', 'Python', 'C / C++', 'Java', 'HTML / CSS'],
  },
  {
    label: 'Frameworks & Libraries',
    skills: ['React', 'Node.js', 'Framer Motion', 'REST APIs', 'Tailwind CSS'],
  },
  {
    label: 'Tools & Design',
    skills: ['Git', 'VS Code', 'Figma', 'IntelliJ', 'PyCharm'],
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const groupVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const pillContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.1,
    },
  },
};

const pillVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

function Skills() {
  return (
    <div className="section skills-section-wrapper">
      <motion.div
        className="skills-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={containerVariants}
      >
        {/* Section header */}
        <motion.div className="s-label" variants={groupVariants}>
          Toolkit
        </motion.div>
        <motion.h2 className="s-title" variants={groupVariants}>
          Skills & technologies.
        </motion.h2>
        
        {/* Skill groups */}
        {skillGroups.map((group, groupIndex) => (
          <motion.div
            key={group.label}
            className="skill-group"
            variants={groupVariants}
          >
            <div className="skill-group-label">{group.label}</div>
            <motion.div
              className="skill-pills"
              variants={pillContainerVariants}
            >
              {group.skills.map((skill) => (
                <motion.div
                  key={skill}
                  className="skill-pill"
                  variants={pillVariants}
                  whileHover={{ 
                    y: -2,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  }}
                >
                  <span>{skill}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default Skills;
