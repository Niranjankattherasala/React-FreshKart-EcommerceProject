// src/components/DasaRasaleTimer.jsx
import React, { useState, useEffect } from "react";
import "./timerComponent.css";

function TimerComponent({ endDate }) {
  const calculateTimeLeft = () => {
    const difference = new Date(endDate) - new Date();
    if (difference <= 0) return null;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) {
    return (
      <div className="dasarasale-banner ended">
        DasaRasale has ended! 🎉
      </div>
    );
  }

  return (
    <div className="dasarasale-banner">
      <h2>🎉 DasaRasale Mega Sale! Up to 50% OFF 🎉</h2>
      <div className="timer">
        <div className="time-box">
          <div className="number">{timeLeft.days}</div>
          <div className="label">Days</div>
        </div>
        <div className="time-box">
          <div className="number">{timeLeft.hours}</div>
          <div className="label">Hours</div>
        </div>
        <div className="time-box">
          <div className="number">{timeLeft.minutes}</div>
          <div className="label">Minutes</div>
        </div>
        <div className="time-box">
          <div className="number">{timeLeft.seconds}</div>
          <div className="label">Seconds</div>
        </div>
      </div>
      <p className="offer-text">Hurry! Grab your favorite items before the sale ends!</p>
    </div>
  );
}

export default TimerComponent;
