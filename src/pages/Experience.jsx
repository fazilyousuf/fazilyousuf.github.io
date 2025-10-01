import React, { useState } from "react";
import "@/styles/experience.css";
import { FaPlus, FaMinus } from "react-icons/fa";

const Experience = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <section
      id="experience"
      className={`experience-section ${isExpanded ? "" : "collapsed"}`}
    >
      <div className="experience-header">
        <h2>My Experience</h2>
        <button className="toggle-btn" onClick={toggleExpand}>
          {isExpanded ? <FaMinus /> : <FaPlus />}
        </button>
      </div>

      <div className="experience-container">
        <div className="experience-card">
          <div className="exp-left">
            <p>Aug 2025 – Oct 2025</p>
          </div>
          <div className="exp-right">
            <h3>GreenCreon LLP Software Solutions </h3>
            <p>Jr. React Developer</p>
          </div>
        </div>
        <div className="experience-card">
          <div className="exp-left">
            <p>Oct 2024 - Sep 2025</p>
          </div>
          <div className="exp-right">
            <h3>Datavalley Web Services </h3>
            <p>Fullstack Developer</p>
          </div>
        </div>
        <div className="experience-card">
          <div className="exp-left">
            <p>Nov 2024 - Feb 2025</p>
          </div>
          <div className="exp-right">
            <h3>iDatalytics, Kochi</h3>
            <p>Data Science Intern</p>
          </div>
        </div>
        <div className="experience-card">
          <div className="exp-left">
            <p>Jun 2024 - Sep 2024</p>
          </div>
          <div className="exp-right">
            <h3>QSpiders, Kochi</h3>
            <p>Python full stack - Trainee</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
