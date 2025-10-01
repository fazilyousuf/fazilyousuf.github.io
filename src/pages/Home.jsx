import React from "react";
import "@/styles/home.css";
import profileImg from "@/assets/profile/profile2.jpg";
import RotatingWords from "@/components/RotatingWords";

const Home = () => {
  return (
    <section id="home" className="home-section">
      <div className="home-container">
        {/* Left Column */}
        <div className="home-left">
          <h1>
            HI, I'M Fazil ! <span>Creative </span> <RotatingWords />
          </h1>
          <p>
            I love creating intuitive and responsive web experiences. I specialize in full-stack development with Python (Django/Flask) and React, integrating data science and machine learning features like NLP, predictive analytics, and computer vision into scalable web applications.
          </p>

          {/* CV Button */}
          <a
            href="https://drive.google.com/file/d/1A2HfQBymS-tkdqO2167My45Iwx2hCzzr/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="cv-button"
          >
            View My CV
          </a>
        </div>

        {/* Right Column */}
        <div className="home-right">
          <img src={profileImg} alt="Fazil" />
        </div>
      </div>
    </section>
  );
};

export default Home;
