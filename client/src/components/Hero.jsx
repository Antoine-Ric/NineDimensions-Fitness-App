import React from 'react';
import { Link } from 'react-router-dom';
import exerciseImageOne from '../images/excercise_image_one.jpg';
import '../styles/Hero.css';

function Hero() {
  return (
    <div className="hero-container">
      <div className="hero-content">
      <img src={exerciseImageOne} alt="Exercise" className="quiz-intro-image" />
        <h1>Get Fit, Get Strong, Get Going</h1>
        <p>
          Build healthy habits with the all-in-one food, exercise, and calorie tracker.
        </p>
        {}
        <Link to="/login" className="btn btn-primary">
          Start Today 
        </Link>
      </div>
    </div>
  );
}

export default Hero;

