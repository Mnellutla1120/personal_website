import React, { useEffect, useState } from 'react';
import './App.css';
import profilePic from './profile.jpeg';
import Navbar from './components/Navbar';

function App() {
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    // Trigger slide in on mount
    setAnimateIn(true);
  }, []);

  return (
    <>
      <Navbar />
      <div className={`homepage-container ${animateIn ? 'slide-in' : ''}`}>
        <div className="left-column">
          <img src={profilePic} alt="Your Name" className="profile-pic" />
          <h1 className="name">Moukthika Nellutla</h1>
          <p className="school">University of Illinois Urbana-Champaign</p>
          <p className="major">Computer Science + Bioengineering</p>
        </div>

        <div className="right-column" id="about">
          <h2>About Me</h2>
          <p>
            Hello! I am an undergraduate student who is deeply interested in the computational aspect of healthcare and clinical practice.
            I leverage the skills I accumulate during my time in college and beyond to prepare for a career as a physician-engineer.
          </p>
          <p>
            Outside of academics, I enjoy reading (I would love for some book recommendations), trying out new things, and taking long walks
            around campus imagining myself to be the main character as the snow falls.
          </p>
          <p className="typing-line">
            <span className="typed-text">Hope you have fun exploring this website :)</span>
            <span className="cursor"></span>
          </p>
          <a
   href="/Moukthika_s_Resume (1).pdf"
   target="_blank"
   rel="noopener noreferrer"
   className="resume-cloud"
   >
   <i className="fa-solid fa-cloud cloud-icon"></i>
   <span className="resume-text">Resume</span>
 </a>
        </div>
  

      </div>
    </>
  );
}

export default App;
