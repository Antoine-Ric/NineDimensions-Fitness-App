import React from 'react';

function Hero() {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1>Get Fit, Get Strong, Get Going</h1>
        <p>
          Our fitness mobile app helps you achieve your fitness goals with personalized
          workout plans, expert guidance, and a supportive community. Whether you're
          a beginner or a seasoned athlete, we have something for everyone.
        </p>
        <a href="/register" className="btn btn-primary">
          Register Now
        </a>
      </div>
      <div className="hero-image">
        {/* Add your fitness app image here */}
      </div>
    </div>
  );
}

export default Hero;
