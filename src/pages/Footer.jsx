import React, { useEffect, useState } from "react";
import "@/styles/footer.css";
import { FaLinkedin, FaGithub, FaInstagram, FaArrowUp } from "react-icons/fa";
import { contactInfo } from "@/data/contactData";

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
          <p>{contactInfo.location}</p>
        </div>

        <div className="footer-block">
          <h4>Let's Talk</h4>
          <p>
            <a href={`tel:${contactInfo.phonePrimary.replace(/\s+/g, "")}`}>
              {contactInfo.phonePrimary} (UAE)
            </a>
          </p>
          <p>
            <a href={`tel:${contactInfo.phoneSecondary.replace(/\s+/g, "")}`}>
              {contactInfo.phoneSecondary} (IN)
            </a>
          </p>
        </div>

        <div className="footer-block">
          <h4>Email</h4>
          <p>
            <a href={`mailto:${contactInfo.emailPrimary}`}>{contactInfo.emailPrimary}</a>
          </p>
          <p>
            <a href={`mailto:${contactInfo.emailSecondary}`}>{contactInfo.emailSecondary}</a>
          </p>
        </div>
      </div>

      {/* Bottom row: Copyright + Social Icons */}
      <div className="footer-bottom">
        <p>© {contactInfo.name} | All Rights Reserved</p>

        {/* Social media */}
        <div className="footer-social">
          <a
            href={contactInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
          >
            <FaLinkedin />
          </a>
          <a
            href={contactInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
          >
            <FaGithub />
          </a>
          <a
            href={contactInfo.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram Profile"
          >
            <FaInstagram />
          </a>
        </div>
        <p className="footer-visits">Total page visits: {visits ?? "Loading..."}</p>
      </div>

      {/* Back to top button */}
      <button className="back-to-top" onClick={scrollToTop} aria-label="Back to top">
        <FaArrowUp />
      </button>
    </footer>
  );
};

export default Footer;