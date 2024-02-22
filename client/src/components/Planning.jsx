import React from 'react';
import './Planning.css';

export default function() {
  return (
    <div className="planning-container">
      <div className="planning-box">
        <h2 className="planning-title">Planning for a Healthy Lifestyle</h2>
        <p className="planning-description">
          Taking control of your health starts with planning. By establishing goals, creating a routine, and finding a support system, you can unlock the
          numerous benefits of a healthy lifestyle, including:
        </p>
        <a href="/register" className="btn btn-primary">
          Start Planning Your Journey Today!
        </a>
      </div>
    </div>
  );
}
