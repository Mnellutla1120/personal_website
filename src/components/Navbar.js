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
    window.open(path, '_blank', 'noopener,noreferrer');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <svg className="logo-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48" fill="#B197FC" />
          <text x="50" y="70" fontFamily="Courier New, monospace" fontSize="60" fontWeight="bold" fill="#000000" textAnchor="middle">MN</text>
        </svg>
        <span>Moukthika Nellutla</span>
      </div>

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
