import React, { useState, useEffect } from "react";
import "@/styles/rotatingWords.css";

const words = ["FullStack Developer",  "Data Scientist", "Backend Developer",  "Frontend Developer","Data Analyst",];

const RotatingWords = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % words.length);
    }, 2000); // change every 2 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <span key={index} className="rotating-word">{words[index]}</span>
  );
};

export default RotatingWords;
