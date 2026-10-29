import React, { useState } from "react";
import "@/styles/navbar.css";
import { FaBars, FaTimes, FaWhatsapp } from "react-icons/fa";
import { contactInfo } from "@/data/contactData";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#service" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar" aria-label="Primary navigation">
      {/* Left side: Location badge + WhatsApp */}
      <div className="navbar-left">
        <div className="location-badge">
          <span className="location-dot" aria-hidden="true" />
          <span>Dubai, UAE</span>
        </div>

        <a
          href={contactInfo.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-number"
          aria-label={`Contact on WhatsApp: ${contactInfo.phonePrimary}`}
        >
          <FaWhatsapp aria-hidden="true" />
          <span>{contactInfo.phonePrimary}</span>
        </a>
      </div>

      {/* Desktop nav links */}
      <ul className="nav-list">
        {navLinks.map((link) => (
          <li className="nav-item" key={link.href}>
            <a href={link.href} className="nav-link">
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Desktop: Connect button */}
      <div className="navbar-right">
        <a
          href={contactInfo.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="connect-btn"
        >
          Let’s Connect
        </a>
      </div>

      {/* Hamburger button (mobile only) */}
      <button
        type="button"
        className="hamburger"
        onClick={toggleMenu}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <ul className="mobile-menu">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={closeMenu}>
                {link.label}
              </a>
            </li>
          ))}
          <li className="mobile-connect-item">
            <a
              href={contactInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="connect-btn"
              onClick={closeMenu}
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