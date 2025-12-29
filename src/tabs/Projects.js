import React, { useState, useEffect } from 'react';
import './Projects.css';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    github: '',
    demo: ''
  });

  useEffect(() => {
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }
    // Load edit mode state
    const savedEditMode = localStorage.getItem('projectsEditMode');
    if (savedEditMode === 'true') {
      setEditMode(true);
    }
  }, []);

  const saveProjects = (newProjects) => {
    localStorage.setItem('projects', JSON.stringify(newProjects));
    setProjects(newProjects);
  };

  const toggleEditMode = () => {
    const newEditMode = !editMode;
    setEditMode(newEditMode);
    localStorage.setItem('projectsEditMode', newEditMode.toString());
    // Reset form if disabling edit mode
    if (!newEditMode) {
      setShowForm(false);
      setEditingId(null);
      setFormData({ title: '', description: '', github: '', demo: '' });
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

  return (
    <div className="projects-container">
      <div className="projects-header">
        <h1>My Projects</h1>
        <div className="header-buttons">
          {editMode && (
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
          )}
          <button 
            className={`edit-mode-btn ${editMode ? 'active' : ''}`} 
            onClick={toggleEditMode}
          >
            {editMode ? '✏️ Edit Mode ON' : '🔒 Edit Mode OFF'}
          </button>
        </div>
      </div>

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
