import React from "react";
import "@/styles/skills.css";
import { skills } from "@/data/skillsData";

const Skills = () => {
  return (
    <section id="skills" className="skills-section">
      <h2 className="skills-heading">
        Technical Skills &amp; Proficiencies
      </h2>

      <div className="skills-container">
        {skills.map((skill, index) => (
          <div className="skill-card" key={index}>
            <div className="skill-icon">
              <img src={skill.icon} alt={skill.name} loading="lazy" />
            </div>
            <div className="skill-percent">{skill.percent}%</div>
            <div className="skill-name">{skill.name}</div>
            {skill.category && (
              <div className="skill-category">{skill.category}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
