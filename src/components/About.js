import React from 'react';
import '../styles/About.css';
import profilePic from '../assets/ash.jpg';

function About() {
  return (
    <section className="about-wrapper">
      <div className="image-container">
        <img src={profilePic} alt="Ash Aung" className="profile-pic" />
        <p className="image-caption">This picture was taken last year while hiking Light House Park.</p>
      </div>
      <div className="about-container">
        <div className="about-intro">
          <h1>About Me</h1>
          <p>Hey there! I'm Htet Wai Yan Aung, a <strong>Software Systems student</strong> at Simon Fraser University. I have a passion for <strong>technology, music, and adventure</strong>. Whether it's diving into the latest R&B tracks or hiking without food for an entire day, I'm always up for a challenge!</p>
        </div>

        <h2>Education</h2>
        <p>I graduated from <strong>Yorkville Secondary High School</strong> in 2023 and started my <strong>Software Systems</strong> major at SFU the same year. Currently, I'm in my <strong>third year</strong>, learning more about programming, software design, and problem-solving.</p>

        <h2>Hobbies & Interests</h2>
        <ul className="hobbies-list">
          <li>🎵 <strong>Music:</strong> I enjoy listening to R&B, and my favorite artist right now is BRB.</li>
          <li>🏸 <strong>Sports:</strong> I used to play basketball, but now I mostly play badminton.</li>
          <li>✈️ <strong>Travel:</strong> I have visited Bangkok, Singapore, Hong Kong, Macau, Indonesia, Malaysia, and Vietnam with my family.</li>
          <li>🥾 <strong>Hiking:</strong> I started hiking last spring and got lost a few times. Lesson learned: check the time regularly.</li>
          <li>📸 <strong>Photography:</strong> I love capturing beaches and mountains. Planning to get a vintage digital camera soon!</li>
        </ul>
      </div>
    </section>
  );
}

export default About;