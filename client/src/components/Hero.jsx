import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Hero.css';

function Hero() {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1>Get Fit, Get Strong, Get Going</h1>
        <p>
          Build healthy habits with the all-in-one food, exercise, and calorie tracker.
        </p>
        {/* Use Link instead of anchor tag */}
        <Link to="/login" className="btn btn-primary">
          Start Today 
        </Link>
      </div>
      <div className="hero-image">
        {/* Add your fitness app image here */}
      </div>
    </div>
  );
}

export default Hero;

