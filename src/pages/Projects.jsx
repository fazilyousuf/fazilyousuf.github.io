import React from "react";
import "@/styles/projects.css";
import { FaExternalLinkAlt } from "react-icons/fa";
import { projects } from "@/data/projectsData";

const Projects = () => {
  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <header className="projects-header">
          <h2 className="projects-title">Featured Projects</h2>
          <p className="projects-subtitle">
            Production platforms, candidate self-service portals, certificate verification systems, and FastAPI infrastructure engineered for the AgenticX digital ecosystem.
          </p>
        </header>

        <div className="projects-grid">
          {projects.map((p) => (
            <article className="projects-card" key={p.id}>
              {/* IMAGE BANNER SECTION */}
              <div className="project-image">
                <img src={p.image} alt={p.title} loading="lazy" />
                {p.badge && (
                  <span className="project-image-badge">{p.badge}</span>
                )}
              </div>

              {/* DETAILS SECTION */}
              <div className="project-details">
                <div className="project-header-row">
                  <h3>{p.title}</h3>
                </div>
                {p.domain && (
                  <span className="project-domain">{p.domain}</span>
                )}

                <p className="project-desc">{p.description}</p>

                {/* Tech Chips */}
                {p.tech && p.tech.length > 0 && (
                  <div className="project-tech">
                    {p.tech.map((t, i) => (
                      <span key={i}>{t}</span>
                    ))}
                  </div>
                )}

                {/* Action Links */}
                <div className="project-links">
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-btn project-btn-primary"
                    >
                      <span>{p.buttonLabel || "Live Demo"}</span>
                      <FaExternalLinkAlt aria-hidden="true" />
                    </a>
                  )}

                  {p.altLink && (
                    <a
                      href={p.altLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-btn project-btn-secondary"
                    >
                      <span>{p.altLabel || "Overview"}</span>
                      <FaExternalLinkAlt aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

