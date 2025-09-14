// src/SearchResults.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "./store"; // adjust your import

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchResults() {
  const food = useSelector((state) => state.food || {});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useQuery();
  const q = (query.get("q") || "").trim().toLowerCase();

  const allItems = [
    ...(food.veg || []),
    ...(food.nonveg || []),
    ...(food.drinks || []),
    ...(food.chocolate || []),
    ...(food.chocolates || []),
  ];

  const findCategoryKey = (item) => {
    if ((food.veg || []).some(i => i.productId === item.productId)) return "veg";
    if ((food.nonveg || []).some(i => i.productId === item.productId)) return "nonveg";
    if ((food.drinks || []).some(i => i.productId === item.productId)) return "drinks";
    if ((food.chocolate || []).some(i => i.productId === item.productId)) return "chocolate";
    if ((food.chocolates || []).some(i => i.productId === item.productId)) return "chocolates";
    return null;
  };

  if (!q) return <div className="p-4">No search query</div>;

  const exactMatch = allItems.find(item => item.productName.toLowerCase() === q);
  const relatedItems = allItems.filter(item => item.productName.toLowerCase().includes(q) && item !== exactMatch);

  let categoryItems = [];
  if (exactMatch) {
    const catKey = findCategoryKey(exactMatch);
    categoryItems = (food[catKey] || []).filter(item => item.productId !== exactMatch.productId);
  }

  const handleItemClick = (item) => {
    const catKey = findCategoryKey(item);
    if (!catKey) return;
    navigate(`/${catKey.charAt(0).toUpperCase() + catKey.slice(1)}`);
  };

  const handleAddToCart = (item) => {
    dispatch(addToCart({ ...item, quantity: 1 }));
  };

  // Card component
  const ItemCard = ({ item, isExact = false }) => (
    <div className={isExact ? "col-md-6 mb-4" : "col-md-3 mb-4"}>
      <div className={`border rounded p-2 h-100 d-flex flex-column justify-content-between ${isExact ? "bg-light shadow-lg" : ""}`}>
        <div onClick={() => handleItemClick(item)} style={{ cursor: "pointer" }}>
          <img
            src={item.productImage}
            alt={item.productName}
            className="w-100 mb-2"
            style={{ height: isExact ? 250 : 150, objectFit: "contain" }}
          />
          <div className="fw-bold">{item.productName}</div>
          <div>₹{item.productPrice}</div>
        </div>
        <button
          className="btn btn-success btn-gradient mt-2"
          onClick={() => handleAddToCart(item)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );

  return (
    <div className="container py-4">
      {/* Exact Match */}
      {exactMatch && (
        <div className="mb-5">
          <h4 className="text-center mb-3">Exact Match</h4>
          <div className="row justify-content-center">
            <ItemCard item={exactMatch} isExact={true} />
          </div>
        </div>
      )}

      {/* Related Items */}
      {relatedItems.length > 0 && (
        <div className="mb-5">
          <h4 className="mb-3">Related Items</h4>
          <div className="row">
            {relatedItems.map(item => <ItemCard key={item.productId} item={item} />)}
          </div>
        </div>
      )}

      {/* Category Items */}
      {categoryItems.length > 0 && (
        <div>
          <h4 className="mb-3">Other items in this category</h4>
          <div className="row">
            {categoryItems.map(item => <ItemCard key={item.productId} item={item} />)}
          </div>
        </div>
      )}

      {!exactMatch && relatedItems.length === 0 && <div>No items found</div>}
    </div>
  );
}

export default SearchResults;
