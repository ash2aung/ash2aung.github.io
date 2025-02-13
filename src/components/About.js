import React from 'react';
import '../styles/About.css';

function About() {
  return (
    <section className="about-container">
      <h1>About Me</h1>
      <p>Hello! My name is Htet Wai Yan Aung, but I usually go by Ash. I'm an 19-year-old student currently studying Software Systems at Simon Fraser University. My hobbies vary from reading manga in bed to going on extreme hikes without food for the entire day. I'm also a huge fan of R&B music, and I've been listening to BRB's albums on repeat for the past few weeks.</p>
      
      <h2>Education</h2>
      <p>I graduated from Yorkville secondary high school in 2023 and began university that same year. I'm currently in my second year, majoring in Software Systems.</p>
      
      <h2>Hobbies & Interests</h2>
      <ul>
        <li>Music: I enjoy listening to R&B, and my favorite artist right now is BRB.</li>
        <li>Sports: I used to play basketball, but now I mostly play badminton.</li>
        <li>Travel: I have been to Bangkok, Singapore, Hong Kong, Macau, Indonesia, Malaysia, and Vietnam with my family.</li>
        <li>Hiking: I started hiking last spring, and I've gotten lost in the mountains a couple of times where I found my way back only after the sunset.</li>
        <li>Photography: I enjoy photography, especially capturing beaches and mountains. Although I've only used my phone for photography so far, I take great pride in my work. I'm also planning to get a vintage digital camera to explore more.</li>
      </ul>
    </section>
  );
}

export default About;