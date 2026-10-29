import React, { useState } from "react";
import "@/styles/education.css";
import { FaPlus, FaMinus } from "react-icons/fa";

const Education = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <section
      id="education"
      className={`education-section${isExpanded ? "" : " collapsed"}`}
    >
      {/* Centered wrapper — same max-width as Projects/Experience */}
      <div className="education-wrapper">
        <div className="education-header">
          <h2>My Education</h2>
          <button
            className="toggle-btn"
            onClick={() => setIsExpanded(v => !v)}
            aria-expanded={isExpanded}
            aria-label={isExpanded ? "Collapse education" : "Expand education"}
          >
            {isExpanded ? <FaMinus /> : <FaPlus />}
          </button>
        </div>

        <div className="education-container">
          <div className="education-card">
            <div className="edu-left">
              <p>2022 – 2024</p>
            </div>
            <div className="edu-right">
              <h3>Master of Computer Applications</h3>
              <p>College of Engineering, Cherthala &nbsp;·&nbsp; 7.85 / 10</p>
            </div>
          </div>

          <div className="education-card">
            <div className="edu-left">
              <p>2019 – 2022</p>
            </div>
            <div className="edu-right">
              <h3>B.Sc. Botany</h3>
              <p>K.K.T.M. Government College, Pullut &nbsp;·&nbsp; 6.54 / 10</p>
            </div>
          </div>

          <div className="education-card">
            <div className="edu-left">
              <p>2024</p>
            </div>
            <div className="edu-right">
              <h3>IBM Data Science Professional Certificate</h3>
              <p>Coursera</p>
            </div>
          </div>

          <div className="education-card">
            <div className="edu-left">
              <p>2024</p>
            </div>
            <div className="edu-right">
              <h3>Introduction to Data Analytics</h3>
              <p>Meta &nbsp;·&nbsp; Coursera</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
