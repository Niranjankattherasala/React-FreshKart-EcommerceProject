import React from "react";
import { useNavigate } from "react-router-dom"; // <-- Import useNavigate
import "./Home.css";
import Footer from "./Footer";

function Home() {
  const navigate = useNavigate(); // <-- Initialize navigate

  const categories = [
    { name: "Vegetables", image: "/images/ladyfinder.jpg" },
    { name: "Chocolates", image: "/images/kinderjoynew.jpg" },
    { name: "Drinks", image: "/images/limca.jpg" },
    { name: "Non-Veg", image: "/images/fishcurry.jpg" },
  ];

  const reviews = [
    {
      name: "John Doe",
      comment: "Great quality products delivered on time!",
      rating: 5,
    },
    {
      name: "Jane Smith",
      comment: "Very fresh groceries, highly recommend!",
      rating: 4,
    },
    {
      name: "Alice Brown",
      comment: "Fast delivery and amazing service.",
      rating: 5,
    },
  ];

  return (
    <div className="home-container">
      {/* ---------------- Hero Section ---------------- */}
      <section className="hero-section premium-style">
        <div className="hero-left full-width">
          <div className="hero-left-content text-dark">
            <h1 className="text-warning">Fresh Groceries Delivered</h1>
            <p>
              Vegetables, Non-Veg, Chocolates, Drinks & more — all at your doorstep!
            </p>
            <a href="/shop" className="btn btn-success bg-info btn-lg w-50">
              Order Now
            </a>
          </div>
        </div>

        {/* Floating grocery icons */}
        <img src="/images/kitkat.png" alt="Chocolate" className="floating-icon icon1" />
        <img src="/images/spi.png" alt="Vegetable" className="floating-icon icon2" />
        <img src="/images/crabcakes.png" alt="Drink" className="floating-icon icon3" />
        <img src="/images/fishcurrynew.png" alt="Non-Veg" className="floating-icon icon4" />
      </section>

      {/* ---------------- Categories Section ---------------- */}
      <section className="categories-section py-5">
        <div className="container">
          <h2 className="text-center mb-5">Shop by Category</h2>
          <div className="row g-4">
            {categories.map((category, index) => (
              <div className="col-6 col-md-3" key={index}>
                <div
                  className="category-card cinematic-card position-relative overflow-hidden rounded"
                  onClick={() => navigate(`/${category.name.toLowerCase()}`)}
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="img-fluid w-100 h-100"
                  />
                  <div className="overlay d-flex justify-content-center align-items-center">
                    <h3 className="text-white fw-bold">{category.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Special Items Section ---------------- */}
      <section className="special-items-section py-5">
        <div className="container text-center">
          <h2 className="mb-5">Special Items</h2>
          <div className="row g-4">
            {[
              { name: "chiken", image: "/images/mutton.jpg" },
              { name: "Fish Curry", image: "/images/fishcurrynew.png" },
              { name: "Chocolates", image: "/images/kinderjoynew.jpg" },
            ].map((item, index) => (
              <div className="col-12 col-md-4" key={index}>
                <div className="special-card p-3 shadow rounded text-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="img-fluid mb-3"
                    style={{ height: "200px", objectFit: "cover", borderRadius: "10px" }}
                  />
                  <h5 className="fw-bold">{item.name}</h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Reviews Section ---------------- */}
      <section className="reviews-section py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5" style={{ fontSize: "2.5rem", fontWeight: "700" }}>
            Customer Reviews
          </h2>
          <div id="reviewsCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                >
                  <div className="d-flex justify-content-center">
                    <div
                      className="review-card p-5 shadow rounded text-center"
                      style={{ maxWidth: "800px", background: "#fff" }}
                    >
                      <h4 className="mb-3" style={{ fontWeight: "600", fontSize: "1.8rem" }}>
                        {review.name}
                      </h4>
                      <p className="mb-4" style={{ fontSize: "1.2rem" }}>
                        "{review.comment}"
                      </p>
                      <div className="stars mb-2" style={{ fontSize: "1.5rem" }}>
                        {Array.from({ length: review.rating }, (_, i) => (
                          <span key={i} className="text-warning">★</span>
                        ))}
                        {Array.from({ length: 5 - review.rating }, (_, i) => (
                          <span key={i} className="text-secondary">★</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Controls */}
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#reviewsCarousel"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#reviewsCarousel"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </section>

      {/* ---------------- Footer ---------------- */}
      <Footer />
    </div>
  );
}

export default Home;
