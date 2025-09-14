import React, { useState } from "react";
import { FaMicrophone } from "react-icons/fa";

function VoiceSearch({ onSearch }) {
  const [listening, setListening] = useState(false);

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
      setListening(false);
      onSearch(speechResult); // send the result to parent
    };

    recognition.onerror = (event) => {
      console.error("Voice recognition error", event.error);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <button
        onClick={handleVoiceSearch}
        style={{
          backgroundColor: listening ? "#f44336" : "#2e7d32",
          border: "none",
          borderRadius: "50%",
          padding: "12px",
          cursor: "pointer",
          color: "#fff",
          fontSize: "18px",
          transition: "all 0.3s ease",
        }}
      >
        <FaMicrophone />
      </button>
      <span>{listening ? "Listening..." : "Click to Speak"}</span>
    </div>
  );
}

export default VoiceSearch;
