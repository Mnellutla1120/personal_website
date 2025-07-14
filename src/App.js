import './App.css';
import profilePic from './profile.jpeg'; // Place your image in the src folder

function App() {
  return (
    <div className="homepage-container">
      <div className="left-column">
        <img src={profilePic} alt="Your Name" className="profile-pic" />
        <h1 className="name">Moukthika Nellutla</h1>
        <p className="school">University of Illinois Urbana-Champaign</p>
        <p className="major">Computer Science + Bioengineering</p>
      </div>
      <div className="right-column">
        <h2>About Me</h2>
        <p>
          I'm a passionate undergraduate student exploring the intersection of AI and neuroscience.
          I love building intelligent systems, working on brain-computer interfaces, and using 
          technology to solve impactful problems.
        </p>
        <p>
          Outside of academics, I enjoy chocolatey drinks, coding side projects, and taking long walks 
          around campus.
        </p>
      </div>
    </div>
  );
}

export default App;
