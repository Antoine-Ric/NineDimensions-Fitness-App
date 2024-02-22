import React from 'react';
import './Hero.css';

function Hero() {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1>Get Fit, Get Strong, Get Going</h1>
        <p>
          Build healthy habits with the all-in-one food, exercise, and calorie tracker.
        </p>
        <a href="/register" className="btn btn-primary">
          Start Today 
        </a>
      </div>
      <div className="hero-image">
        {/* Add your fitness app image here */}
      </div>
    </div>
  );
}

export default Hero;
