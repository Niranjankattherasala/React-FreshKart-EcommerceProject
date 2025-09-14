import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./store";
import { toast } from "react-toastify";
import AddToCartButton from "./Addtocartbutton";

function Chocolate() {
  const dispatch = useDispatch();
  const chocolates = useSelector((state) => state.food.chocolate);

  // 🔹 Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const endPageIndex = currentPage * itemsPerPage;
  const startPageIndex = endPageIndex - itemsPerPage;

  const currentPageItems = chocolates.slice(startPageIndex, endPageIndex);
  const totalPages = Math.ceil(chocolates.length / itemsPerPage);

  return (
    <div className="container   mt-5 pt-5">
      <div className="row g-2 gy-5">
        {currentPageItems.map((product) => (
          <div className="col-md-3" key={product.productId}>
            <div className="card h-100 shadow-lg veg-card position-relative">
              {/* ✅ Discount Badge */}
              <span className="badge bg-info text-dark position-absolute top-0 end-0 m-2">
                {product.discount}
              </span>

              {/* ✅ Product Image */}
              <img
                src={product.productImage}
                alt={product.productName}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />

              {/* ✅ Card Body */}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-normal fs-5 fst-italic">
                  {product.productName}
                </h5>
                <h4 className="card-price  fs-5 fst-italic text-center text-primary">₹{product.productPrice}</h4>

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
          className="btn btn-outline-info mx-1"
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
              currentPage === index + 1 ? "btn-info text-white" : "btn-outline-secondary"
            }`}
          >
            {index + 1}
          </button>
        ))}

        {/* Next */}
        <button
          className="btn btn-outline-info mx-1"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Chocolate;
