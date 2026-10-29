import React, { useState } from "react";
import "@/styles/contact.css";
import {
  FaArrowLeft,
  FaArrowRight,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";
import projectLogo from "@/assets/project.png";
import { contactInfo } from "@/data/contactData";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const images = contactInfo.profileImages || [];
  const [current, setCurrent] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState({ state: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nextImage = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ state: "idle", message: "" });

    const templateParams = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
    };

    try {
      await emailjs.send(
        "service_yebrmuc",
        "template_5reqxyk",
        templateParams,
        "UF34HNqbRqdHGMc8R"
      );
      setStatus({
        state: "success",
        message: "Thank you! Your message has been sent successfully. I will get back to you soon.",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus({
        state: "error",
        message: "Failed to send email. Please reach out directly on WhatsApp or Email.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <header className="contact-header">
          <h2 className="contact-title">Get in Touch</h2>
          <p className="contact-subtitle">
            Let's discuss full-stack engineering, AI/ML integrations, or upcoming opportunities in Dubai and remotely.
          </p>
        </header>

        <div className="contact-layout">
          {/* Left Column: Visual, Stats & Direct Channels */}
          <div className="contact-left-card">
            {images.length > 0 && (
              <div className="contact-slider-wrapper">
                <img
                  src={images[current]}
                  alt="Muhammad Fazil"
                  className="contact-profile-img"
                />
                <button
                  type="button"
                  className="slider-arrow-btn prev"
                  onClick={prevImage}
                  aria-label="Previous photo"
                >
                  <FaArrowLeft />
                </button>
                <button
                  type="button"
                  className="slider-arrow-btn next"
                  onClick={nextImage}
                  aria-label="Next photo"
                >
                  <FaArrowRight />
                </button>
                <div className="slider-dots">
                  {images.map((_, idx) => (
                    <span
                      key={idx}
                      className={`slider-dot ${idx === current ? "active" : ""}`}
                      onClick={() => setCurrent(idx)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Completed Projects Badge */}
            <div className="contact-stats-badge">
              <img
                src={projectLogo}
                alt="Projects icon"
                className="contact-stats-icon"
              />
              <p className="contact-stats-text">
                <span className="contact-stats-number">
                  {contactInfo.completedProjectsCount}
                </span>
                Production Deployments
              </p>
            </div>

            {/* Direct Channels */}
            <div className="contact-channels">
              <a
                href={contactInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="channel-link"
              >
                <FaWhatsapp />
                <span>WhatsApp: {contactInfo.phonePrimary}</span>
              </a>

              <a
                href={`mailto:${contactInfo.emailPrimary}`}
                className="channel-link"
              >
                <FaEnvelope />
                <span>{contactInfo.emailPrimary}</span>
              </a>

              <div className="channel-link">
                <FaMapMarkerAlt />
                <span>{contactInfo.location}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="contact-form-card">
            <h3 className="form-heading">Send a Direct Message</h3>
            <p className="form-subtext">
              Have a question or project idea? Leave a message below and I will respond promptly.
            </p>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label className="form-label" htmlFor="contact-name">
                  Your Name *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  className="form-input"
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-email">
                  Your Email *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-phone">
                  Phone Number
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  name="phone"
                  className="form-input"
                  placeholder="+971 50 123 4567"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-message">
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  className="form-textarea"
                  placeholder="Tell me about your project, timeline, or inquiry..."
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              {status.state !== "idle" && (
                <div className={`form-status-msg ${status.state}`}>
                  {status.message}
                </div>
              )}

              <button
                type="submit"
                className="form-submit-btn"
                disabled={isSubmitting}
              >
                <span>{isSubmitting ? "Sending Message..." : "Send Message"}</span>
                <FaPaperPlane aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
