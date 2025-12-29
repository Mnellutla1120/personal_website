import React from 'react';
import projectsData from '../data/projects.json';
import './Projects.css';

export default function Projects() {
  return (
    <div className="projects-container">
      <div className="projects-header">
        <h1>My Projects</h1>
      </div>

      <div className="projects-grid">
        {projectsData.length === 0 ? (
          <p className="empty-state">No projects yet.</p>
        ) : (
          projectsData.map(project => (
            <div key={project.id} className="project-card">
              <div className="card-header">
                <h3>{project.title}</h3>
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
