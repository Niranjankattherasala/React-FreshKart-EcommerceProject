import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./store";
import { toast } from "react-toastify";   // ✅ Import toast
import AddToCartButton from "./Addtocartbutton";

function Nonveg() {
  const nonVeg = useSelector((state) => state.food.nonveg);
  const dispatch = useDispatch();

  // 🔹 Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const endPageIndex = currentPage * itemsPerPage;
  const startPageIndex = endPageIndex - itemsPerPage;

  const currentPageItems = nonVeg.slice(startPageIndex, endPageIndex);
  const totalPages = Math.ceil(nonVeg.length / itemsPerPage);

  return (
    <div className="container mt-2 pt-1">
      <div className="row g-4 align-items-strech">
        {currentPageItems.map((product) => (
          <div className="col-md-3" key={product.productId}>
            <div className="card h-100 shadow-lg border-0 d-flex flex-column position-relative veg-card">
              {/* Badge */}
              <span className="badge bg-danger text-light position-absolute top-0 end-0 m-2">
                {product.discount}
              </span>
              <span
                className="position-absolute top-0 start-0 m-2 d-flex align-items-center justify-content-center"
                style={{
                  height: "16px",
                  width: "16px",
                  border: "2px solid red",
                  background: "white",
                }}
              >
                <span
                  style={{
                    height: "8px",
                    width: "8px",
                    backgroundColor: "red",
                    borderRadius: "50%",
                  }}
                ></span>
              </span>

              {/* Product Image */}
              <img
                src={product.productImage}
                alt={product.productName}
                className="card-img-top card-img"
                style={{ height: "200px", objectFit: "cover" }}
              />

              {/* Card Body */}
              <div className="card-body text-center d-flex flex-column">
                <h5 className="card-title  fs-5 fst-italic">{product.productName}</h5>
                <p className="card-text  fs-5 fst-italic">₹{product.productPrice}</p>
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
        <button
          className="btn btn-outline-danger mx-1"
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
              currentPage === index + 1 ? "btn-danger" : "btn-outline-secondary"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          className="btn btn-outline-danger mx-1"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Nonveg;
