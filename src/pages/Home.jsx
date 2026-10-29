import React from "react";
import "@/styles/home_temp.css";
import RotatingWords from "@/components/RotatingWords";
import { homeData } from "@/data/homeData";

const Home = () => {
  return (
    <section id="home" className="home-section">
      <div className="home-container">
        {/* Left Column */}
        <div className="home-left">
          <h1>
            {homeData.greeting} <span>{homeData.highlightPrefix}</span> <RotatingWords />
          </h1>
          <p>{homeData.bio}</p>

          {/* CV Button */}
          <a
            href={homeData.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cv-button"
          >
            {homeData.cvLabel}
          </a>
        </div>

        {/* Right Column */}
        <div className="home-right">
          <img src={homeData.profileImg} alt="Fazil" />
        </div>
      </div>
    </section>
  );
};

export default Home;