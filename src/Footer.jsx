import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Cinematic glowing overlay */}
      <div className="overlay" />

      <div className="footer-content">
        <p className="footer-text">
          &copy; {new Date().getFullYear()} Grocery Store. All rights reserved.
        </p>

        <div className="social-icons">
          <a href="#" className="social-icon neon-flicker facebook">
            <FaFacebookF />
          </a>
          <a href="#" className="social-icon neon-flicker instagram">
            <FaInstagram />
          </a>
          <a href="#" className="social-icon neon-flicker twitter">
            <FaTwitter />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
