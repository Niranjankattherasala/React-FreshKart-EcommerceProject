import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaMicrophone } from "react-icons/fa";

function SearchBar() {
  const [searchInput, setSearchInput] = useState("");
  const [listening, setListening] = useState(false);
  const navigate = useNavigate();
  const food = useSelector((state) => state.food || {});

  const q = (searchInput || "").trim().toLowerCase();

  const allItems = useMemo(() => {
    return [
      ...(food.veg || []),
      ...(food.nonveg || []),
      ...(food.drinks || []),
      ...(food.chocolate || []),
      ...(food.chocolates || []),
    ];
  }, [food]);

  const filteredItems = useMemo(() => {
    if (!q) return [];
    return allItems.filter(item => item.productName.toLowerCase().includes(q));
  }, [q, allItems]);

  const handleItemClick = (item) => {
    navigate(`/search?q=${encodeURIComponent(item.productName)}`);
    setSearchInput("");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchInput.trim())}`);
      setSearchInput("");
    }
  };

  const handleVoiceSearch = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      alert("Your browser does not support voice search");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();
    setListening(true);

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setSearchInput(speechResult);
      setListening(false);
    };

    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
  };

  return (
    <div className="position-relative w-100" style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      <form onSubmit={handleSearchSubmit} style={{ display: "flex", gap: "5px" }}>
        <input
          type="text"
          placeholder="Search items"
          className="form-control shadow-none"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button
  type="button"
  onClick={handleVoiceSearch}
  style={{
    backgroundColor: listening ? "#f44336" : "#534bc6ff",
    border: "none",
    borderRadius: "50%",
    padding: "5px 5px",
    cursor: "pointer",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "-35px", 
    marginTop:"10px",
    marginBottom:"10px" ,// << Shift mic 30px to the left
  }}
>
  <FaMicrophone />
</button>

      </form>

      {q && filteredItems.length > 0 && (
        <ul
          className="list-group position-absolute w-100 mt-1"
          style={{ maxHeight: "400px", overflowY: "auto", zIndex: 1000 }}
        >
          {filteredItems.map(item => (
            <li
              key={item.productId}
              className="list-group-item list-group-item-action d-flex align-items-center"
              style={{ cursor: "pointer" }}
              onClick={() => handleItemClick(item)}
            >
              <img
                src={item.productImage}
                alt={item.productName}
                style={{ width: 50, height: 50, objectFit: "cover", marginRight: 10 }}
              />
              <div>
                <div className="fw-bold">{item.productName}</div>
                <div>₹{item.productPrice}</div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {q && filteredItems.length === 0 && (
        <ul className="list-group position-absolute w-100 mt-1" style={{ zIndex: 1000 }}>
          <li className="list-group-item">No items found</li>
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
