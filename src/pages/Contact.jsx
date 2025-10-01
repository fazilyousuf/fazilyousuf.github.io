import React, { useState } from "react";
import "@/styles/Contact.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import projectLogo from "@/assets/project.png"; 
import img1 from "@/assets/profile/Profile.jpg";
import img2 from "@/assets/profile/Profile2.jpg";
import img3 from "@/assets/profile/Profile3.jpg";
import img4 from "@/assets/profile/Profile4.jpg";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const images = [img4,img1, img2, img3 ];
  const [current, setCurrent] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const nextImage = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
    };

    emailjs.send(
      "service_yebrmuc",    // Replace with your EmailJS service ID
      "template_5reqxyk",   // Replace with your EmailJS template ID
      templateParams,
      "UF34HNqbRqdHGMc8R"     // Replace with your EmailJS public key
    )
    .then(() => {
      alert("Email sent successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" });
    })
    .catch((err) => {
      console.error(err);
      alert("Failed to send email. Please try again later.");
    });
  };

  return (
    <section id="contact" className="contact-section">
      {/* Left side */}
      <div className="contact-left">
        <div className="image-slider hover-glass">
          <img src={images[current]} alt="Profile" className="profile-img" />
          <button className="nav-btn left" onClick={prevImage}>
            <FaArrowLeft />
          </button>
          <button className="nav-btn right" onClick={nextImage}>
            <FaArrowRight />
          </button>
        </div>

        {/* Completed Projects */}
        <div className="project-card">
          <img src={projectLogo} alt="project" />
          <p><span className="project-count">5+</span> Completed Projects</p>
        </div>
      </div>

      {/* Right side */}
      <div className="contact-right glass hover-glass">
        <h2>CONNECT WITH ME</h2>
        <p>
          If you have any questions or would like to connect, don't hesitate to
          get in touch. I'm eager to explore new opportunities and engage in
          meaningful discussions.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
