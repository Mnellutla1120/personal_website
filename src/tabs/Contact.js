import React, { useState, useEffect } from 'react';
import contactData from '../data/contactInfo.json';
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
  const [showExportModal, setShowExportModal] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // Load from JSON file on mount
  useEffect(() => {
    setSocials(contactData);
    // Load edit mode state from localStorage
    const savedEditMode = localStorage.getItem('contactEditMode');
    if (savedEditMode === 'true') {
      setEditMode(true);
      // If in edit mode, check for localStorage overrides
      const localSocials = localStorage.getItem('contactSocials');
      if (localSocials) {
        try {
          const parsed = JSON.parse(localSocials);
          setSocials(parsed);
        } catch (e) {
          // Invalid JSON, use file data
        }
      }
    }
  }, []);

  const toggleEditMode = () => {
    const newEditMode = !editMode;
    setEditMode(newEditMode);
    localStorage.setItem('contactEditMode', newEditMode.toString());
    if (!newEditMode) {
      // Reload from JSON file when exiting edit mode
      setSocials(contactData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSocials(prev => {
      const updated = { ...prev, [name]: value };
      // Save to localStorage for preview in edit mode
      localStorage.setItem('contactSocials', JSON.stringify(updated));
      return updated;
    });
  };

  const handleExport = () => {
    setShowExportModal(true);
  };

  const handleCopyJSON = () => {
    const jsonString = JSON.stringify(socials, null, 2);
    navigator.clipboard.writeText(jsonString).then(() => {
      alert('JSON copied to clipboard! Paste it into src/data/contactInfo.json');
    });
  };

  const handleDownloadJSON = () => {
    const jsonString = JSON.stringify(socials, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contactInfo.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Contact Me</h1>
        <div className="header-buttons">
          {editMode && (
            <button className="export-btn" onClick={handleExport}>
              💾 Export JSON
            </button>
          )}
          <button 
            className={`edit-mode-btn ${editMode ? 'active' : ''}`} 
            onClick={toggleEditMode}
          >
            {editMode ? '✏️ Edit Mode ON' : '🔒 Edit Mode OFF'}
          </button>
        </div>
        {editMode && (
          <p className="subtitle">Edit your information below. Remember to export and update the JSON file!</p>
        )}
        {!editMode && (
          <p className="subtitle">Get in touch with me through these platforms</p>
        )}
      </div>

      {showExportModal && (
        <div className="modal-overlay" onClick={() => setShowExportModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Export Contact Info JSON</h2>
            <p>Copy this JSON and paste it into <code>src/data/contactInfo.json</code> to save your changes permanently.</p>
            <pre className="json-preview">{JSON.stringify(socials, null, 2)}</pre>
            <div className="modal-buttons">
              <button className="copy-btn" onClick={handleCopyJSON}>Copy to Clipboard</button>
              <button className="download-btn" onClick={handleDownloadJSON}>Download JSON</button>
              <button className="close-btn" onClick={() => setShowExportModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

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
            disabled={!editMode}
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
            disabled={!editMode}
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
            disabled={!editMode}
          />
        </div>

        <div className="form-group">
          <label htmlFor="twitter">Twitter/X</label>
          <input
            type="url"
            id="twitter"
            name="twitter"
            placeholder="https://twitter.com/yourusername"
            value={socials.twitter}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>

        <div className="form-group">
          <label htmlFor="instagram">Instagram</label>
          <input
            type="url"
            id="instagram"
            name="instagram"
            placeholder="https://instagram.com/yourusername"
            value={socials.instagram}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>

        <div className="form-group">
          <label htmlFor="website">Personal Website</label>
          <input
            type="url"
            id="website"
            name="website"
            placeholder="https://yourwebsite.com"
            value={socials.website}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>
        {editMode && (
          <p className="form-note-edit">💡 Remember to export and update the JSON file to save permanently!</p>
        )}
      </form>

      <div className="social-links-preview">
        <h2>Contact Links</h2>
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
            <p className="empty-preview">No contact information available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
