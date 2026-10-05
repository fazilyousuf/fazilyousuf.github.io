import React, { useState, useEffect, useRef } from "react";
import "@/styles/Experience.css";
import { experiences } from "@/data/experienceData";
import {
  FaExternalLinkAlt,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaBriefcase,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

const Experience = () => {
  // Track expanded state for each card's highlights
  const [expandedCards, setExpandedCards] = useState({});
  const itemRefs = useRef([]);

  const toggleHighlights = (id) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Scroll reveal with IntersectionObserver (respects prefers-reduced-motion)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      itemRefs.current.forEach((el) => {
        if (el) el.classList.add("is-visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section id="experience" className="experience-section">
      <div className="experience-wrapper">
        <header className="experience-header">
          <h2 className="experience-title">Work Experience</h2>
          <p className="experience-subtitle">
            A chronological timeline of my professional roles, engineering milestones, and AI platform deliveries.
          </p>
        </header>

        <div className="timeline-container">
          {experiences.map((exp, index) => {
            const isLatest =
              exp.id === "agenticx" ||
              exp.company.toLowerCase().includes("agenticx");
            const isExpanded = !!expandedCards[exp.id];
            const hasMoreHighlights =
              exp.highlights && exp.highlights.length > 3;
            const visibleHighlights =
              exp.highlights && !isExpanded
                ? exp.highlights.slice(0, 3)
                : exp.highlights || [];
            const remainingCount =
              exp.highlights && hasMoreHighlights
                ? exp.highlights.length - 3
                : 0;

            return (
              <article
                key={exp.id || index}
                ref={(el) => (itemRefs.current[index] = el)}
                className={`timeline-item ${isLatest ? "is-latest" : ""}`}
              >
                {/* Timeline node/marker */}
                <div className="timeline-node" aria-hidden="true">
                  <div className="timeline-node-dot" />
                </div>

                {/* Timeline Card */}
                <div className="timeline-card">
                  {/* Card Header: Role, Latest badge, Company */}
                  <div className="exp-card-header">
                    <div className="exp-role-group">
                      <div className="exp-title-row">
                        <h3 className="exp-role">{exp.role}</h3>
                        {isLatest && (
                          <span className="timeline-badge-latest">Latest</span>
                        )}
                      </div>
                      <div className="exp-company">
                        {exp.website ? (
                          <a
                            href={exp.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="exp-company-link"
                          >
                            <span>{exp.company}</span>
                            <FaExternalLinkAlt
                              className="exp-external-icon"
                              aria-hidden="true"
                            />
                          </a>
                        ) : (
                          <span>{exp.company}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Metadata bar: Period, Location, Type */}
                  <div className="exp-meta-bar">
                    <span className="exp-meta-item exp-meta-period">
                      <FaCalendarAlt aria-hidden="true" />
                      <span>{exp.period}</span>
                    </span>
                    <span className="exp-meta-item">
                      <FaMapMarkerAlt aria-hidden="true" />
                      <span>{exp.location}</span>
                    </span>
                    <span className="exp-meta-item exp-type-tag">
                      <FaBriefcase aria-hidden="true" />
                      <span>{exp.type}</span>
                    </span>
                  </div>

                  {/* Optional summary */}
                  {exp.summary && (
                    <p className="exp-summary">{exp.summary}</p>
                  )}

                  {/* Highlights section with progressive disclosure */}
                  {exp.highlights && exp.highlights.length > 0 && (
                    <div className="exp-highlights-section">
                      <div className="exp-highlights-title">Key Contributions</div>
                      <ul
                        id={`exp-highlights-${exp.id}`}
                        className="exp-highlights-list"
                      >
                        {visibleHighlights.map((highlight, hIndex) => (
                          <li key={hIndex} className="exp-highlight-item">
                            {highlight}
                          </li>
                        ))}
                      </ul>

                      {hasMoreHighlights && (
                        <button
                          type="button"
                          className="exp-toggle-button"
                          onClick={() => toggleHighlights(exp.id)}
                          aria-expanded={isExpanded}
                          aria-controls={`exp-highlights-${exp.id}`}
                        >
                          <span>
                            {isExpanded
                              ? "Show less"
                              : `Show more (+${remainingCount} more)`}
                          </span>
                          {isExpanded ? (
                            <FaChevronUp aria-hidden="true" />
                          ) : (
                            <FaChevronDown aria-hidden="true" />
                          )}
                        </button>
                      )}
                    </div>
                  )}

                  {/* Nested Project Card */}
                  {exp.project && (
                    <div className="exp-nested-project">
                      <div className="nested-project-header">
                        {exp.project.tag && (
                          <span className="nested-project-tag">
                            {exp.project.tag}
                          </span>
                        )}
                        <h4 className="nested-project-title">
                          {exp.project.title}
                        </h4>
                      </div>

                      {exp.project.highlights &&
                        exp.project.highlights.length > 0 && (
                          <ul className="nested-project-highlights">
                            {exp.project.highlights.map((pHighlight, pIdx) => (
                              <li
                                key={pIdx}
                                className="nested-project-highlight-item"
                              >
                                {pHighlight}
                              </li>
                            ))}
                          </ul>
                        )}

                      {exp.project.tech && exp.project.tech.length > 0 && (
                        <div className="nested-project-tech">
                          {exp.project.tech.map((pTech, ptIdx) => (
                            <span key={ptIdx} className="tech-chip tech-chip-nested">
                              {pTech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tech stack chips */}
                  {exp.tech && exp.tech.length > 0 && (
                    <div className="exp-tech-section">
                      <div className="exp-tech-title">Technologies & Tools</div>
                      <div className="exp-tech-list">
                        {exp.tech.map((techName, tIndex) => (
                          <span key={tIndex} className="tech-chip">
                            {techName}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;

