import React from "react";
import "@/styles/projects.css";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import IPTSImg from "@/assets/projects/IPTS.png";
import IncTraImg from "@/assets/projects/IncTra.png";
import SummIMG from "@/assets/projects/Summerizer.png";
import MLImg from "@/assets/projects/ML.jpg"

const projects = [
  {
    title: "Proctoring System",
    image: IPTSImg,
    description: "Real-time proctoring system to detect exam anomalies using browser-side computer vision and deep learning.",
    tech: ["Python", "OpenCV", "React ","MediaPipe", "Deep Learning","TensorFlow.js","BlazeFace · COCO-SSD · Django · PostgreSQL"],
    live: "https://ipts-fe.vercel.app/",
    github: "https://github.com/fazilyousuf/IPTS",
    credentials: {
      username: "student1",
      password: "Fazil@123",
    },
  },
  {
    title: "IncTra - Personal Budget Tracker",
    image: IncTraImg,
    description: "A full-stack personal finance tracker with interactive visual analytics.",
    tech: ["Python", "React", "REST APIs","SQLite3", "JWT Authentication"],
    live: "https://inctra-frontend.onrender.com/",
    github: "https://github.com/fazilyousuf/IncTra",
    credentials: {
      username: "fazil",
      password: "fazil",
    },
  },
  {
    title: "Text Summarizer Platform",
    image: SummIMG,
    description: "A fast and scalable text summarization platform optimized by migrating from local transformer models to Google Gemini API.",
    tech: ["Python", "NLP", "REST API", "Transformers", " Google Gemini API"],
    live: "https://ipts-fe.vercel.app/",
    github: "https://github.com/fazilyousuf/IPTS    ",
  },
  {
    title: "Falcon 9 Landing Prediction",
    image: MLImg,
    description: "End-to-end data science project predicting the successful landing of SpaceX Falcon 9 first-stage boosters using historical launch data and machine learning classification models.",
    tech: ["Python", "Scikit-Learn","NumPy", "Pandas","SQL","Matplotlib", "Machine Learning","Data Analysis"],
    github: "https://github.com/fazilyousuf/IBM_Data_Science",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="projects-section">
      <h2 className="projects-title">My Projects</h2>

      <div className="projects-grid">
        {projects.map((p, index) => (
          <div className="projects-card" key={index}>
            
            {/* IMAGE TOP SECTION (40%) */}
            <div className="project-image">
              <img src={p.image} alt={p.title} />
            </div>

            {/* DETAILS SECTION (60%) */}
            <div className="project-details">
              <h3>{p.title}</h3>
              <p className="project-desc">{p.description}</p>

              {p.credentials && (
                <div className="project-creds">
                  <p><strong>Test Login:</strong></p>
                  <p>Username: {p.credentials.username}</p>
                  <p>Password: {p.credentials.password}</p>
                </div>
              )}

              {/* Tech Footer */}
              <div className="project-tech">
                {p.tech.map((t, i) => (
                  <span key={i}>{t}</span>
                ))}
              </div>

              {/* Buttons */}
              <div className="project-links">
                <a href={p.live} target="_blank">
                  Live <FaExternalLinkAlt />
                </a>
                <a href={p.github} target="_blank">
                  Code <FaGithub />
                </a>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
