import React, { useState, useEffect } from 'react';
import blogPostsData from '../data/blogPosts.json';
import './Blog.css';

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });

  // Load from JSON file on mount
  useEffect(() => {
    setBlogPosts(blogPostsData);
    // Load edit mode state from localStorage
    const savedEditMode = localStorage.getItem('blogEditMode');
    if (savedEditMode === 'true') {
      setEditMode(true);
      // If in edit mode, check for localStorage overrides
      const localPosts = localStorage.getItem('blogPosts');
      if (localPosts) {
        try {
          const parsed = JSON.parse(localPosts);
          if (parsed.length > 0 || blogPostsData.length === 0) {
            setBlogPosts(parsed);
          }
        } catch (e) {
          // Invalid JSON, use file data
        }
      }
    }
  }, []);

  const savePosts = (newPosts) => {
    // Save to localStorage for preview in edit mode
    localStorage.setItem('blogPosts', JSON.stringify(newPosts));
    setBlogPosts(newPosts);
  };

  const toggleEditMode = () => {
    const newEditMode = !editMode;
    setEditMode(newEditMode);
    localStorage.setItem('blogEditMode', newEditMode.toString());
    // Reset form if disabling edit mode
    if (!newEditMode) {
      setShowForm(false);
      setEditingId(null);
      setFormData({ title: '', content: '' });
      // Reload from JSON file when exiting edit mode
      setBlogPosts(blogPostsData);
    }
  };

  const handleEdit = (post) => {
    setEditingId(post.id);
    setFormData({
      title: post.title,
      content: post.content || ''
    });
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ title: '', content: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim()) {
      if (editingId) {
        // Update existing post
        const updatedPosts = blogPosts.map(post =>
          post.id === editingId
            ? { 
                ...post, 
                title: formData.title,
                content: formData.content,
                updatedAt: new Date().toISOString()
              }
            : post
        );
        savePosts(updatedPosts);
      } else {
        // Add new post
        const newPost = {
          id: Date.now(),
          title: formData.title,
          content: formData.content,
          date: new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }),
          createdAt: new Date().toISOString()
        };
        const updatedPosts = [...blogPosts, newPost];
        savePosts(updatedPosts);
      }
      setFormData({ title: '', content: '' });
      setShowForm(false);
      setEditingId(null);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      const updatedPosts = blogPosts.filter(post => post.id !== id);
      savePosts(updatedPosts);
    }
  };

  const handleExport = () => {
    setShowExportModal(true);
  };

  const handleCopyJSON = () => {
    const jsonString = JSON.stringify(blogPosts, null, 2);
    navigator.clipboard.writeText(jsonString).then(() => {
      alert('JSON copied to clipboard! Paste it into src/data/blogPosts.json');
    });
  };

  const handleDownloadJSON = () => {
    const jsonString = JSON.stringify(blogPosts, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'blogPosts.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="blog-container">
      <div className="blog-header">
        <h1>My Blog</h1>
        <div className="header-buttons">
          {editMode && (
            <>
              <button className="add-btn" onClick={() => {
                if (showForm && !editingId) {
                  handleCancel();
                } else {
                  setEditingId(null);
                  setFormData({ title: '', content: '' });
                  setShowForm(!showForm);
                }
              }}>
                {showForm && !editingId ? 'Cancel' : '+ Add Blog Entry'}
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

      {showExportModal && (
        <div className="modal-overlay" onClick={() => setShowExportModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Export Blog Posts JSON</h2>
            <p>Copy this JSON and paste it into <code>src/data/blogPosts.json</code> to save your changes permanently.</p>
            <pre className="json-preview">{JSON.stringify(blogPosts, null, 2)}</pre>
            <div className="modal-buttons">
              <button className="copy-btn" onClick={handleCopyJSON}>Copy to Clipboard</button>
              <button className="download-btn" onClick={handleDownloadJSON}>Download JSON</button>
              <button className="close-btn" onClick={() => setShowExportModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {showForm && editMode && (
        <form className="blog-form" onSubmit={handleSubmit}>
          <h2>{editingId ? 'Edit Blog Entry' : 'Add New Blog Entry'}</h2>
          <input
            type="text"
            placeholder="Blog Title *"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Blog Content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows="10"
            className="blog-content-input"
          />
          <p className="form-note">
            {editingId ? 'Click "Update Blog Entry" to save changes.' : 'Date will be automatically recorded when you add the entry.'}
          </p>
          <div className="form-buttons">
            <button type="submit" className="submit-btn">
              {editingId ? 'Update Blog Entry' : 'Add Blog Entry'}
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

      <div className="blog-grid">
        {blogPosts.length === 0 ? (
          <p className="empty-state">No blog entries yet. {editMode && 'Enable edit mode and click "Add Blog Entry" to get started!'}</p>
        ) : (
          blogPosts.map(post => (
            <div key={post.id} className="blog-card">
              <div className="card-header">
                <h3>{post.title}</h3>
                {editMode && (
                  <div className="card-actions">
                    <button className="edit-btn" onClick={() => handleEdit(post)} title="Edit">
                      ✏️
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(post.id)} title="Delete">
                      ×
                    </button>
                  </div>
                )}
              </div>
              <p className="card-date">Published: {post.date}</p>
              {post.content && (
                <div className="card-content">
                  <p>{post.content}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
