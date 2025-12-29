import React, { useState, useEffect } from 'react';
import projectsData from '../data/projects.json';
import { EDIT_MODE_PASSWORD } from '../config/password';
import './Projects.css';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    github: '',
    demo: ''
  });

  // Load from JSON file on mount
  useEffect(() => {
    setProjects(projectsData);
    // Load edit mode state from localStorage
    const savedEditMode = localStorage.getItem('projectsEditMode');
    if (savedEditMode === 'true') {
      setEditMode(true);
      // If in edit mode, check for localStorage overrides
      const localProjects = localStorage.getItem('projects');
      if (localProjects) {
        try {
          const parsed = JSON.parse(localProjects);
          if (parsed.length > 0 || projectsData.length === 0) {
            setProjects(parsed);
          }
        } catch (e) {
          // Invalid JSON, use file data
        }
      }
    }
  }, []);

  const saveProjects = (newProjects) => {
    // Save to localStorage for preview in edit mode
    localStorage.setItem('projects', JSON.stringify(newProjects));
    setProjects(newProjects);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === EDIT_MODE_PASSWORD) {
      setEditMode(true);
      setShowPasswordModal(false);
      setPasswordInput('');
      setPasswordError('');
      localStorage.setItem('projectsEditMode', 'true');
    } else {
      setPasswordError('Incorrect password. Access denied.');
      setPasswordInput('');
    }
  };

  const toggleEditMode = () => {
    if (editMode) {
      // If already in edit mode, just disable it
      setEditMode(false);
      localStorage.setItem('projectsEditMode', 'false');
      setShowForm(false);
      setEditingId(null);
      setFormData({ title: '', description: '', github: '', demo: '' });
      // Reload from JSON file when exiting edit mode
      setProjects(projectsData);
    } else {
      // If not in edit mode, show password modal
      setShowPasswordModal(true);
      setPasswordInput('');
      setPasswordError('');
    }
  };

  const handleEdit = (project) => {
    setEditingId(project.id);
    setFormData({
      title: project.title,
      description: project.description || '',
      github: project.github || '',
      demo: project.demo || ''
    });
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ title: '', description: '', github: '', demo: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim()) {
      if (editingId) {
        // Update existing project
        const updatedProjects = projects.map(project =>
          project.id === editingId
            ? { ...project, ...formData }
            : project
        );
        saveProjects(updatedProjects);
      } else {
        // Add new project
        const newProject = {
          id: Date.now(),
          ...formData,
          createdAt: new Date().toISOString()
        };
        const updatedProjects = [...projects, newProject];
        saveProjects(updatedProjects);
      }
      setFormData({ title: '', description: '', github: '', demo: '' });
      setShowForm(false);
      setEditingId(null);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const updatedProjects = projects.filter(project => project.id !== id);
      saveProjects(updatedProjects);
    }
  };

  const handleExport = () => {
    setShowExportModal(true);
  };

  const handleCopyJSON = () => {
    const jsonString = JSON.stringify(projects, null, 2);
    navigator.clipboard.writeText(jsonString).then(() => {
      alert('JSON copied to clipboard! Paste it into src/data/projects.json');
    });
  };

  const handleDownloadJSON = () => {
    const jsonString = JSON.stringify(projects, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'projects.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="projects-container">
      <div className="projects-header">
        <h1>My Projects</h1>
        <div className="header-buttons">
          {editMode && (
            <>
              <button className="add-btn" onClick={() => {
                if (showForm && !editingId) {
                  handleCancel();
                } else {
                  setEditingId(null);
                  setFormData({ title: '', description: '', github: '', demo: '' });
                  setShowForm(!showForm);
                }
              }}>
                {showForm && !editingId ? 'Cancel' : '+ Add Project'}
              </button>
              <button className="export-btn" onClick={handleExport}>
                💾 Export JSON
              </button>
            </>
          )}
          <button 
            className={`edit-mode-btn ${editMode ? 'active' : ''}`} 
            onClick={toggleEditMode}
          >
            {editMode ? '✏️ Edit Mode ON' : '🔒 Edit Mode OFF'}
          </button>
        </div>
      </div>

      {showPasswordModal && (
        <div className="modal-overlay" onClick={() => setShowPasswordModal(false)}>
          <div className="modal-content password-modal" onClick={(e) => e.stopPropagation()}>
            <h2>🔒 Enter Password</h2>
            <p>Enter the password to enable edit mode.</p>
            <form onSubmit={handlePasswordSubmit}>
              <input
                type="password"
                placeholder="Password"
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setPasswordError('');
                }}
                className="password-input"
                autoFocus
              />
              {passwordError && <p className="password-error">{passwordError}</p>}
              <div className="modal-buttons">
                <button type="submit" className="submit-btn">Submit</button>
                <button type="button" className="close-btn" onClick={() => {
                  setShowPasswordModal(false);
                  setPasswordInput('');
                  setPasswordError('');
                }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showExportModal && (
        <div className="modal-overlay" onClick={() => setShowExportModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Export Projects JSON</h2>
            <p>Copy this JSON and paste it into <code>src/data/projects.json</code> to save your changes permanently.</p>
            <pre className="json-preview">{JSON.stringify(projects, null, 2)}</pre>
            <div className="modal-buttons">
              <button className="copy-btn" onClick={handleCopyJSON}>Copy to Clipboard</button>
              <button className="download-btn" onClick={handleDownloadJSON}>Download JSON</button>
              <button className="close-btn" onClick={() => setShowExportModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {showForm && editMode && (
        <form className="project-form" onSubmit={handleSubmit}>
          <h2>{editingId ? 'Edit Project' : 'Add New Project'}</h2>
          <input
            type="text"
            placeholder="Project Title *"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows="4"
          />
          <input
            type="url"
            placeholder="GitHub Repository URL"
            value={formData.github}
            onChange={(e) => setFormData({ ...formData, github: e.target.value })}
          />
          <input
            type="url"
            placeholder="Demo/Live URL"
            value={formData.demo}
            onChange={(e) => setFormData({ ...formData, demo: e.target.value })}
          />
          <div className="form-buttons">
            <button type="submit" className="submit-btn">
              {editingId ? 'Update Project' : 'Add Project'}
            </button>
            {editingId && (
              <button type="button" className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
            )}
          </div>
          <p className="form-note-edit">💡 Remember to export and update the JSON file to save permanently!</p>
        </form>
      )}

      <div className="projects-grid">
        {projects.length === 0 ? (
          <p className="empty-state">No projects yet. {editMode && 'Enable edit mode and click "Add Project" to get started!'}</p>
        ) : (
          projects.map(project => (
            <div key={project.id} className="project-card">
              <div className="card-header">
                <h3>{project.title}</h3>
                {editMode && (
                  <div className="card-actions">
                    <button className="edit-btn" onClick={() => handleEdit(project)} title="Edit">
                      ✏️
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(project.id)} title="Delete">
                      ×
                    </button>
                  </div>
                )}
              </div>
              {project.description && <p className="card-description">{project.description}</p>}
              <div className="card-links">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="link-btn github">
                    GitHub
                  </a>
                )}
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className="link-btn demo">
                    Demo
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
