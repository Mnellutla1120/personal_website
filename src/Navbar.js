import React from 'react';
import './Navbar.css';

function Navbar({ onAboutClick }) {
  return (
    <nav className="navbar">
        Moukthika Nellutla

      <ul className="navbar-links">
        <li>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              onAboutClick();
            }}
          >
            About
          </a>
        </li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
