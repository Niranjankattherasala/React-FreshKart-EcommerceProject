

import React, { useEffect, useState } from "react";

function AboutUs() {
  const [visibleSections, setVisibleSections] = useState({});
  const [showStory, setShowStory] = useState(false);

  const images = {
    hero: "https://images.pexels.com/photos/5938/food-salad-healthy-lunch.jpg?auto=compress&cs=tinysrgb&h=650&w=1400",
    story: "https://images.pexels.com/photos/164077/pexels-photo-164077.jpeg?auto=compress&cs=tinysrgb&h=650&w=1000",
    quality: "https://images.pexels.com/photos/290817/pexels-photo-290817.jpeg?auto=compress&cs=tinysrgb&h=400&w=600",
    sustainability: "https://images.pexels.com/photos/235721/pexels-photo-235721.jpeg?auto=compress&cs=tinysrgb&h=400&w=600",
    delivery: "https://images.pexels.com/photos/619742/pexels-photo-619742.jpeg?auto=compress&cs=tinysrgb&h=400&w=600",
    partners1: "https://images.pexels.com/photos/162069/pexels-photo-162069.jpeg?auto=compress&cs=tinysrgb&h=200&w=200",
    partners2: "https://images.pexels.com/photos/162065/pexels-photo-162065.jpeg?auto=compress&cs=tinysrgb&h=200&w=200",
    partners3: "https://images.pexels.com/photos/164077/pexels-photo-164077.jpeg?auto=compress&cs=tinysrgb&h=200&w=200",
  };

  const sections = [
    {
      id: "quality",
      title: "Freshness & Quality",
      img: images.quality,
      text: "Hand-picked vegetables and fruits from local trusted farmers. Only the freshest produce reaches your kitchen.",
    },
    {
      id: "sustainability",
      title: "Sustainable & Local",
      img: images.sustainability,
      text: "Supporting eco-friendly farming and local communities. Freshness shouldn't harm the planet.",
    },
    {
      id: "delivery",
      title: "Fast & Reliable Delivery",
      img: images.delivery,
      text: "Order online and get your groceries delivered fresh and on time. Enjoy hassle-free shopping from the comfort of your home.",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      sections.forEach((section) => {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top < window.innerHeight - 100) {
            setVisibleSections((prev) => ({ ...prev, [section.id]: true }));
          }
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sectionStyle = (id) => ({
    opacity: visibleSections[id] ? 1 : 0,
    transform: visibleSections[id] ? "translateY(0)" : "translateY(50px)",
    transition: "all 0.8s ease",
    padding: "80px 20px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: "40px",
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(10px)",
    borderRadius: "15px",
    margin: "40px auto",
    maxWidth: "1200px",
  });

  const modalStyle = {
    display: showStory ? "flex" : "none",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    padding: "20px",
  };

  const storyImgStyle = {
    width: "100%",
    maxWidth: "900px",
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
  };

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: "#f5f5f5", color: "#333" }}>
      {/* Hero */}
      <div style={{ position: "relative", height: "500px", backgroundImage: `url(${images.hero})`, backgroundSize: "cover", backgroundPosition: "center", display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", color: "#fff" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.2))" }}></div>
        <div style={{ position: "relative", zIndex: 2 }}>
          <h1 style={{ fontSize: "48px", marginBottom: "15px", textShadow: "2px 2px 10px rgba(0,0,0,0.7)" }}>Fresh & Healthy Vegetables</h1>
          <p style={{ fontSize: "20px", marginBottom: "25px", textShadow: "1px 1px 5px rgba(0,0,0,0.6)" }}>Farm-to-Table Freshness Delivered to Your Doorstep</p>
          <button
            style={{ padding: "14px 30px", backgroundColor: "#2e7d32", border: "none", borderRadius: "30px", color: "#fff", fontWeight: "bold", cursor: "pointer", boxShadow: "0 5px 15px rgba(0,0,0,0.3)", transition: "all 0.3s ease" }}
            onClick={() => setShowStory(true)}
            onMouseOver={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.5)"; }}
            onMouseOut={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.3)"; }}
          >
            Watch Our Story
          </button>
        </div>
      </div>

      {/* Story Modal */}
      <div style={modalStyle} onClick={() => setShowStory(false)}>
        <img src={images.story} alt="Our Story" style={storyImgStyle} onClick={e => e.stopPropagation()} />
      </div>

      {/* Sections */}
      {sections.map((sec) => (
        <div key={sec.id} id={sec.id} style={sectionStyle(sec.id)}>
          <img src={sec.img} alt={sec.title} style={{ borderRadius: "15px", maxWidth: "400px", width: "100%", transition: "transform 0.3s ease", boxShadow: "0 5px 20px rgba(0,0,0,0.2)" }}
            onMouseOver={e => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
          />
          <div style={{ maxWidth: "500px", fontSize: "16px", lineHeight: 1.7, color: "#333" }}>
            <h2 style={{ color: "#2e7d32", marginBottom: "15px" }}>{sec.title}</h2>
            <p>{sec.text}</p>
          </div>
        </div>
      ))}

      {/* Partners */}
      <div style={{ padding: "80px 20px", textAlign: "center" }}>
        <h2 style={{ marginBottom: "40px", color: "#2e7d32" }}>Our Trusted Partners</h2>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "40px" }}>
          {[images.partners1, images.partners2, images.partners3].map((img, i) => (
            <img key={i} src={img} alt={`Partner ${i + 1}`} style={{ width: "130px", height: "130px", objectFit: "cover", borderRadius: "50%", transition: "all 0.3s ease", filter: "grayscale(50%)", boxShadow: "0 5px 20px rgba(0,0,0,0.2)" }}
              onMouseOver={e => { e.currentTarget.style.transform = "scale(1.15)"; e.currentTarget.style.filter = "grayscale(0%)"; }}
              onMouseOut={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.filter = "grayscale(50%)"; }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
