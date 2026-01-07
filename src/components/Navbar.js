import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleAboutClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      // Already on home page, just scroll
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to home page first
      navigate('/');
      // Scroll after a brief delay to allow page to render
      setTimeout(() => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleLinkClick = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <nav className="navbar">
      Moukthika Nellutla

      <ul className="navbar-links">
        <li>
          <a href="#about" onClick={handleAboutClick}>
            About
          </a>
        </li>
        <li>
          <a href="/projects" onClick={(e) => handleLinkClick(e, '/projects')}>
            Projects
          </a>
        </li>
        <li>
          <a href="/blog" onClick={(e) => handleLinkClick(e, '/blog')}>
            Blog
          </a>
        </li>
        <li>
          <a href="/contact" onClick={(e) => handleLinkClick(e, '/contact')}>
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
