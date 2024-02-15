import React from 'react';

export default function() {
  return (
    <div className="planning-container">
      <div className="planning-box">
        <h2 className="planning-title">Planning for a Healthy Lifestyle</h2>
        <p className="planning-description">
          Taking control of your health starts with planning. By establishing goals,
          creating a routine, and finding a support system, you can unlock the
          numerous benefits of a healthy lifestyle, including:
        </p>
        <ul className="planning-benefits">
          <li>Increased energy and stamina</li>
          <li>Improved mood and mental well-being</li>
          <li>Stronger immune system</li>
          <li>Reduced risk of chronic diseases</li>
          <li>Enhanced sleep quality</li>
          <li>Greater confidence and self-esteem</li>
        </ul>
        <a href="/register" className="btn btn-primary">
          Start Planning Your Journey Today!
        </a>
      </div>
    </div>
  );
}
