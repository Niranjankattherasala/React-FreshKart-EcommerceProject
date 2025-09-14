// src/components/ContactUs.jsx
import React, { useState, useEffect } from "react";
import "./ContactUs.css";

function ContactUs() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true); // Trigger fade-in animation
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${formData.name}! Your message has been sent.`);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className={`contact-us ${visible ? "visible" : ""}`}>
      <h2 className="contact-title">Contact Us</h2>
      <div className="contact-content" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="contact-form" style={{ maxWidth: 500, margin: "0 auto" }}>
          <div className="input-group">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <label>Name</label>
          </div>
          <div className="input-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label>Email</label>
          </div>
          <div className="input-group">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <label>Message</label>
          </div>
          <button type="submit" className="submit-btn">Send</button>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
