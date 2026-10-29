import React from "react";
import "@/styles/about.css";
import { aboutData } from "@/data/aboutData";

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <h2>{aboutData.sectionTitle}</h2>
        <div className="about-subtitle">
          {aboutData.subtitles.map((sub, idx) => (
            <p key={idx}>{sub}</p>
          ))}
        </div>

        <div className="about-content">
          {/* Left Section: Animation */}
          <div className="about-left">
            <div className="circle-animation">
              <div className="circle circle1"></div>
              <div className="circle circle2"></div>
              <div className="circle circle3"></div>
            </div>
          </div>

          {/* Right Section: Description */}
          <div className="about-right">
            <p>{aboutData.bio}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;