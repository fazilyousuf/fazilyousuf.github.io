import React, { useEffect, useState } from "react";
import "@/styles/footer.css";
import { FaLinkedin, FaGithub, FaInstagram, FaArrowUp } from "react-icons/fa";

const Footer = () => {

  const [visits, setVisits] = useState(null);

  useEffect(() => {
    fetch("/api/visits")
      .then(res => res.json())
      .then(data => setVisits(data.visits))
      .catch(() => setVisits("—"));
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer-section">
      {/* Top row: Address, Let's Talk, Send Email */}
      <div className="footer-top">
        <div className="footer-block">
          <h4>Address</h4>
          <p>Al Rashidiya, Dubai, United Arab Emirates</p>
        </div>

        <div className="footer-block">
          <h4>Let's Talk❤️</h4>
          <p>+91 9562011528</p>
          <p>+971 525959413</p>
        </div>

        <div className="footer-block">
          <h4>Email</h4>
          <p>
            <a href="mailto:muhammadfazilvk@gmail.com">muhammadfazilvk@gmail.com</a>
          </p>
          <p>
            <a href="mailto:fazilvkdev@gmail.com">fazilvkdev@gmail.com</a>
          </p>
        </div>
      </div>

      {/* Bottom row: Copyright + Social Icons */}
      <div className="footer-bottom">
        <p>© Muhammad Fazil V K | All Rights Reserved</p>

        {/* Social media */}
        <div className="footer-social">
          <a
            href="https://www.linkedin.com/in/yousuffazil"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/fazilyousuf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.instagram.com/yousuf_fazil__"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
        </div>
        <p className="footer-visits">Total page visits: {visits ?? "Loading..."}</p>
      </div>

      {/* Back to top button */}
      <button className="back-to-top" onClick={scrollToTop}>
        <FaArrowUp />
      </button>
    </footer>
  );
};

export default Footer;
