import React from "react";
import "@/styles/skills.css";
import reactLogo from "@/assets/React.svg";
import pythonLogo from "@/assets/Python.svg";
import djangoLogo from "@/assets/Django.svg"
import Js from "@/assets/JavaScript.png"
import HTMLogo from "@/assets/HTML.png"
import CSSLogo from "@/assets/CSS3_logo.png"
import SQLogo from "@/assets/SQL.png"
import VITELogo from "@/assets/Vite.svg";
import ReduxLogo from "@/assets/Redux.png";
import PandasLogo from "@/assets/Pandas_logo.svg";
import GithubLogo from "@/assets/Github.png";
import PostmanLogo from "@/assets/Postman.png";

const skills = [
  { name: "React", percent: 60, icon: reactLogo },
  { name: "Python", percent: 80, icon: pythonLogo },
  { name: "Django", percent: 70, icon: djangoLogo },
  { name: "JavaScript", percent: 75, icon: Js },
  { name: "HTML", percent: 90, icon: HTMLogo },
  { name: "CSS", percent: 85, icon: CSSLogo },
  { name: "SQL", percent: 55, icon: SQLogo},
  { name: "VITE", percent: 55, icon: VITELogo},
  { name: "Redux", percent: 50, icon: ReduxLogo},
  { name: "Pandas", percent: 85, icon: PandasLogo},
  { name: "GitHub", percent: 80, icon: GithubLogo},
  { name: "Postman", percent: 70, icon: PostmanLogo}
];

const Skills = () => {
  return (
    <section id="skills" className="skills-section">
      <h2 className="skills-heading">
        I craft wonderful digital experiences <br /> for brands
      </h2>

      <div className="skills-container">
        {skills.map((skill, index) => (
          <div className="skill-card" key={index}>
            <div className="skill-icon">
              <img src={skill.icon} alt={skill.name} />
            </div>
            <div className="skill-percent">{skill.percent}%</div>
            <div className="skill-name">{skill.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
