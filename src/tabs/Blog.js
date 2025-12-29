import React, { useState, useEffect } from 'react';
import './Blog.css';

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });

  useEffect(() => {
    const savedPosts = localStorage.getItem('blogPosts');
    if (savedPosts) {
      setBlogPosts(JSON.parse(savedPosts));
    }
    // Load edit mode state
    const savedEditMode = localStorage.getItem('blogEditMode');
    if (savedEditMode === 'true') {
      setEditMode(true);
    }
  }, []);

  const savePosts = (newPosts) => {
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

  return (
    <div className="blog-container">
      <div className="blog-header">
        <h1>My Blog</h1>
        <div className="header-buttons">
          {editMode && (
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
