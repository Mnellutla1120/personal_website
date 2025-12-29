import React, { useState, useEffect } from 'react';
import './Contact.css';

export default function Contact() {
  const [socials, setSocials] = useState({
    email: '',
    linkedin: '',
    github: '',
    twitter: '',
    instagram: '',
    website: ''
  });

  useEffect(() => {
    const savedSocials = localStorage.getItem('contactSocials');
    if (savedSocials) {
      setSocials(JSON.parse(savedSocials));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSocials(prev => {
      const updated = { ...prev, [name]: value };
      localStorage.setItem('contactSocials', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Contact Me</h1>
        <p className="subtitle">Add your social media links and contact information</p>
      </div>

      <form className="contact-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="your.email@example.com"
            value={socials.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="linkedin">LinkedIn</label>
          <input
            type="url"
            id="linkedin"
            name="linkedin"
            placeholder="https://linkedin.com/in/yourprofile"
            value={socials.linkedin}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="github">GitHub</label>
          <input
            type="url"
            id="github"
            name="github"
            placeholder="https://github.com/yourusername"
            value={socials.github}
            onChange={handleChange}
          />
        </div>
      </form>

      <div className="social-links-preview">
        <h2>Your Social Links</h2>
        <div className="links-grid">
          {socials.email && (
            <a href={`mailto:${socials.email}`} className="social-link email">
              <span className="link-icon">✉</span>
              <span className="link-text">Email</span>
            </a>
          )}
          {socials.linkedin && (
            <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="social-link linkedin">
              <span className="link-icon">💼</span>
              <span className="link-text">LinkedIn</span>
            </a>
          )}
          {socials.github && (
            <a href={socials.github} target="_blank" rel="noopener noreferrer" className="social-link github">
              <span className="link-icon">🔗</span>
              <span className="link-text">GitHub</span>
            </a>
          )}
          {socials.twitter && (
            <a href={socials.twitter} target="_blank" rel="noopener noreferrer" className="social-link twitter">
              <span className="link-icon">🐦</span>
              <span className="link-text">Twitter</span>
            </a>
          )}
          {socials.instagram && (
            <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className="social-link instagram">
              <span className="link-icon">📷</span>
              <span className="link-text">Instagram</span>
            </a>
          )}
          {socials.website && (
            <a href={socials.website} target="_blank" rel="noopener noreferrer" className="social-link website">
              <span className="link-icon">🌐</span>
              <span className="link-text">Website</span>
            </a>
          )}
          {Object.values(socials).every(val => !val) && (
            <p className="empty-preview">Fill out the form above to see your social links here!</p>
          )}
        </div>
      </div>
    </div>
  );
}
