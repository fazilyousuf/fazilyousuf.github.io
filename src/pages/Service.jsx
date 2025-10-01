import React from "react";
import "@/styles/service.css";

const Service = () => {
  return (
    <section id="service" className="service-section">
      <div className="service-container">
        <h2>MY SERVICE</h2>
        <h3>
          Crafting digital experiences
          <br />
          one line of code at a time
        </h3>

        <div className="service-cards">
          <div className="service-card">
            <h4 className="service-title">Fullstack Development</h4>
            <p className="service-desc">
              Full-stack developer with expertise in React, Python (Django/Flask), building custom web applications with responsive UI/UX. Skilled in RESTful APIs, real-time apps, Redux state management, component libraries, database optimization, and secure authentication (JWT/Token) for scalable, efficient solutions.
            </p>
          </div>
          <div className="service-card">
            <h4 className="service-title">Machine Learning Solutions</h4>
            <p className="service-desc">
              Designing and deploying custom ML models for real-world applications. Experienced in Computer Vision tasks such as face detection and object recognition, Natural Language Processing for text analysis and summarization, and building predictive analytics systems to drive data-driven decisions.
            </p>
          </div>
          <div className="service-card">
            <h4 className="service-title">Data Science & Analytics</h4>
            <p className="service-desc">
              Performing data preprocessing, cleaning, and analysis with insightful visualizations and statistical reporting. Developing business intelligence dashboards and integrating AI/ML models into web applications, including real-time computer vision systems and NLP-powered features to enhance data-driven decision-making.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Service;
