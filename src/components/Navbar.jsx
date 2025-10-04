import React, { useState } from "react";
import "@/styles/navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar" aria-label="Primary">
      {/* Left side: number + Dubai */}
      <div className="navbar-left">
        <p className="contact-number">+971 52 595 9413</p>
        <span className="location">Dubai</span>
      </div>

      {/* Desktop nav links */}
      <ul className="nav-list">
        <li className="nav-item"><a href="#home" className="nav-link">Home</a></li>
        <li className="nav-item"><a href="#about" className="nav-link">About</a></li>
        <li className="nav-item"><a href="#experience" className="nav-link">Experience</a></li>
        <li className="nav-item"><a href="#education" className="nav-link">Education</a></li>
        <li className="nav-item"><a href="#contact" className="nav-link">Contact</a></li>
      </ul>

      {/* Desktop: Connect button */}
      <div className="navbar-right">
        <a
          href="https://www.linkedin.com/in/yousuffazil"
          target="_blank"
          rel="noopener noreferrer"
          className="connect-btn"
        >
          Let’s Connect
        </a>
      </div>

      {/* Hamburger menu (mobile only) */}
      <div className="hamburger" onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <ul className="mobile-menu">
          <li><a href="#home" onClick={toggleMenu}>Home</a></li>
          <li><a href="#about" onClick={toggleMenu}>About</a></li>
          <li><a href="#experience" onClick={toggleMenu}>Experience</a></li>
          <li><a href="#education" onClick={toggleMenu}>Education</a></li>
          <li><a href="#contact" onClick={toggleMenu}>Contact</a></li>
          <li>
            <a
              href="https://www.linkedin.com/in/yousuffazil"
              target="_blank"
              rel="noopener noreferrer"
              className="connect-btn"
              onClick={toggleMenu}
            >
              Let’s Connect
            </a>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
