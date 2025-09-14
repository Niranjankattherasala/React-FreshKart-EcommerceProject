// AddToCartButton.jsx
import React from "react";
import { FaShoppingCart } from "react-icons/fa";

const AddToCartButton = ({ onClick, label = "Add to Cart", color = "primary" }) => {
  return (
    <button
      onClick={onClick}
      className={`btn btn-${color} flex items-center gap-2`}
    >
      <FaShoppingCart /> {label}
    </button>
  );
};

export default AddToCartButton;
