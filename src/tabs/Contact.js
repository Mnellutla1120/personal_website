import React, { useState } from 'react';
import contactData from '../data/contactInfo.json';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;
    
    // Create mailto link with subject and body
    const subject = encodeURIComponent(`Message from ${name || 'Website Visitor'}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    const mailtoLink = `mailto:${contactData.email}?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    setSubmitted(true);
    
    // Reset form after a delay
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Contact Me</h1>
        <p className="subtitle">Send me a message and I'll get back to you!</p>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Your Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Your Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message *</label>
          <textarea
            id="message"
            name="message"
            placeholder="Write your message here..."
            value={formData.message}
            onChange={handleChange}
            rows="8"
            required
          />
        </div>

        {submitted && (
          <div className="success-message">
            ✓ Opening your email client to send the message!
          </div>
        )}

        <button type="submit" className="submit-btn">
          📧 Send Message
        </button>
      </form>

      <div className="social-links-preview">
        <h2>Or find me on</h2>
        <div className="links-grid">
          {contactData.email && (
            <a href={`mailto:${contactData.email}`} className="social-link email">
              <span className="link-icon">✉</span>
              <span className="link-text">Email</span>
            </a>
          )}
          {contactData.linkedin && (
            <a href={contactData.linkedin} target="_blank" rel="noopener noreferrer" className="social-link linkedin">
              <span className="link-icon">💼</span>
              <span className="link-text">LinkedIn</span>
            </a>
          )}
          {contactData.github && (
            <a href={contactData.github} target="_blank" rel="noopener noreferrer" className="social-link github">
              <span className="link-icon">🔗</span>
              <span className="link-text">GitHub</span>
            </a>
          )}
          {contactData.twitter && (
            <a href={contactData.twitter} target="_blank" rel="noopener noreferrer" className="social-link twitter">
              <span className="link-icon">🐦</span>
              <span className="link-text">Twitter</span>
            </a>
          )}
          {contactData.instagram && (
            <a href={contactData.instagram} target="_blank" rel="noopener noreferrer" className="social-link instagram">
              <span className="link-icon">📷</span>
              <span className="link-text">Instagram</span>
            </a>
          )}
          {contactData.website && (
            <a href={contactData.website} target="_blank" rel="noopener noreferrer" className="social-link website">
              <span className="link-icon">🌐</span>
              <span className="link-text">Website</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
