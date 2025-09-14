import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./store";
import { toast, ToastContainer } from "react-toastify";
import AddToCartButton from "./Addtocartbutton";
import { color } from "framer-motion";
import "./veg.css";



function Veg() {
  const veg = useSelector((state) => state.food.veg);
  const dispatch = useDispatch();

  // 🔹 Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const endPageIndex = currentPage * itemsPerPage;
  const startPageIndex = endPageIndex - itemsPerPage;

  const currentPageItems = veg.slice(startPageIndex, endPageIndex);
  const totalPages = Math.ceil(veg.length / itemsPerPage);

  return (
    <div className="container mt-5 pt-5">
  <div className="row g-4 gy-5">
    {currentPageItems.map((product) => (
      <div className="col-md-3" key={product.productId}>
        <div className="card shadow-lg h-100 border-0 position-relative veg-card">
          
          {/* Discount Badge */}
          <span className="badge bg-warning text-dark position-absolute top-0 end-0 m-2">
            20% OFF
          </span>

          {/* Veg/Non-veg Indicator */}
          <span
            className="position-absolute top-0 start-0 m-2 d-flex align-items-center justify-content-center"
            style={{
              width: "22px",
              height: "22px",
              border: "2px solid green",
              borderRadius: "4px",
              backgroundColor: "white",
            }}
          >
            <span
              style={{
                width: "10px",
                height: "10px",
                backgroundColor: "green",
                borderRadius: "50%",
              }}
            ></span>
          </span>

          {/* Product Image */}
          <img
            src={product.productImage}
            alt={product.productName}
            style={{ height: "200px", objectFit: "contain" }}
            className="card-img-top card-img"
          />

          <div className="card-body d-flex flex-column">
            
           

            {/* Product Name */}
            <h5 className="card-title text-info fs-5 fst-italic">
              {product.productName}
            </h5>

            {/* Product Price */}
            <h4 className="card-price text-info text-center fs-5">
              ₹{product.productPrice}
            </h4>

            {/* Add to Cart Button */}
            <button
              className="btn-gradient mt-auto"
              onClick={() => {
                dispatch(addToCart(product));
                toast.success(
                  `${product.productName} added to the cart successfully`
                );
              }}
            >
              Add to Cart
            </button>

          </div>
        </div>
      </div>
    ))}
  </div>

  {/* Pagination Controls */}
  <div className="d-flex justify-content-center mt-4">
    <button
      className="btn btn-outline-primary mx-1"
      onClick={() => setCurrentPage((prev) => prev - 1)}
      disabled={currentPage === 1}
    >
      Previous
    </button>

    {Array.from({ length: totalPages }, (_, index) => (
      <button
        key={index + 1}
        onClick={() => setCurrentPage(index + 1)}
        className={`btn mx-1 ${
          currentPage === index + 1 ? "btn-primary" : "btn-outline-secondary"
        }`}
      >
        {index + 1}
      </button>
    ))}

    <button
      className="btn btn-outline-primary mx-1"
      onClick={() => setCurrentPage((prev) => prev + 1)}
      disabled={currentPage === totalPages}
    >
      Next
    </button>
  </div>
</div>

  );
}

export default Veg;
