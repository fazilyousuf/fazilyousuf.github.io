import React from "react";
import "@/styles/about.css";

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <h2>About Me</h2>
        <div className="about-subtitle">
          <p>Hey there!</p>
          <p>I help businesses go digital</p>
          <p>Transforming ideas into digital realities</p>
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
            <p>
              Hello there! I'm Muhammad Fazil V K, passionate about creating intuitive digital
              experiences, blending strong design principles with a keen eye for detail. I'm skilled
              in React, Python and Django, with a deep interest in machine learning and data science, always
              exploring new ways to innovate.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
