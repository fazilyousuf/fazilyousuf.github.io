import React from "react";
import "@/styles/education.css";
import { educationList } from "@/data/educationData";
import { FaGraduationCap, FaCalendarAlt, FaAward } from "react-icons/fa";

const Education = () => {
  return (
    <section id="education" className="education-section">
      <div className="education-container">
        <header className="education-header">
          <h2 className="education-title">Education & Credentials</h2>
          <p className="education-subtitle">
            Academic qualifications, specialized technical degrees, and accredited data science certifications.
          </p>
        </header>

        <div className="education-grid">
          {educationList.map((edu) => (
            <article className="education-card" key={edu.id}>
              {/* Card Top: Badges and Period */}
              <div className="edu-card-top">
                <div className="edu-tag-group">
                  <span className="edu-type-badge">
                    {edu.type === "degree" ? "Degree" : "Certification"}
                  </span>
                  {edu.score && (
                    <span className="edu-score-pill">{edu.score}</span>
                  )}
                </div>
                <span className="edu-period-badge">
                  <FaCalendarAlt aria-hidden="true" />
                  <span>{edu.period}</span>
                </span>
              </div>

              {/* Title & Institution */}
              <h3 className="edu-degree">{edu.degree}</h3>
              <div className="edu-institution">
                {edu.type === "degree" ? (
                  <FaGraduationCap aria-hidden="true" />
                ) : (
                  <FaAward aria-hidden="true" />
                )}
                <span>{edu.institution}</span>
              </div>
              {edu.university && (
                <div className="edu-university">{edu.university}</div>
              )}

              {/* Description */}
              {edu.description && (
                <p className="edu-desc">{edu.description}</p>
              )}

              {/* Skills / Focus tags */}
              {edu.skills && edu.skills.length > 0 && (
                <div className="edu-skills">
                  {edu.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="edu-skill-chip">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;

