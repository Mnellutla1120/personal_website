import React from 'react';
import blogPostsData from '../data/blogPosts.json';
import './Blog.css';

export default function Blog() {
  return (
    <div className="blog-container">
      <div className="blog-header">
        <h1>My Blog</h1>
      </div>

      <div className="blog-grid">
        {blogPostsData.length === 0 ? (
          <p className="empty-state">No blog entries yet.</p>
        ) : (
          blogPostsData.map(post => (
            <div key={post.id} className="blog-card">
              <div className="card-header">
                <h3>{post.title}</h3>
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
