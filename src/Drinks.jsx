import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./store";
import { toast } from "react-toastify";
import AddToCartButton from "./Addtocartbutton";

function Drinks() {
  const drinks = useSelector((state) => state.food.Drinks);
  const dispatch = useDispatch();

  // 🔹 Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const endPageIndex = currentPage * itemsPerPage;
  const startPageIndex = endPageIndex - itemsPerPage;

  const currentPageItems = drinks.slice(startPageIndex, endPageIndex);
  const totalPages = Math.ceil(drinks.length / itemsPerPage);

  return (
    <div className="container mt-5 pt-5">
      <div className="row g-1 gy-5">
        {currentPageItems.map((product) => (
          <div className="col-md-3" key={product.productId}>
            <div className="card h-100 shadow-lg border-0 d-flex flex-column position-relative veg-card">
              {/* ✅ Discount Badge */}
              <span className="badge bg-warning text-dark position-absolute top-0 end-0 m-2">
                {product.discount}
              </span>

              {/* ✅ Image without styles */}
              <img
                src={product.productImage}
                alt={product.productName}
                className="card-img-top"
                 style={{ height: "180px", objectFit: "contain", backgroundColor: "#f8f9fa" }}
                
                 
              />

              {/* ✅ Card Body */}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-normal fs-5 fst-italic">
                  {product.productName}
                </h5>
                <h4 className="card-price fs-5 fst-italic text-center">₹{product.productPrice}</h4>

                {/* ✅ Add to Cart Button aligned bottom */}
                 <button
                                  className="btn-gradient"
                                  onClick={() => {
                                dispatch(addToCart(product));
                                toast.success(`${product.productName} added to the cart successfully`);
                                   }}
                                 >
                                   Add to Cart
                                 </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 🔹 Pagination Controls */}
      <div className="d-flex justify-content-center mt-4">
        {/* Previous */}
        <button
          className="btn btn-outline-warning mx-1"
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`btn mx-1 ${
              currentPage === index + 1
                ? "btn-warning text-white"
                : "btn-outline-secondary"
            }`}
          >
            {index + 1}
          </button>
        ))}

        {/* Next */}
        <button
          className="btn btn-outline-warning mx-1"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Drinks;
