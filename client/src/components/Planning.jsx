import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../styles/Planning.css';

export default function Planning() { // Updated the function name to Planning
  return (
    <div className="planning-container">
      <div className="planning-box">
        <h2 className="planning-title">Planning for a Healthy Lifestyle</h2>
        <p className="planning-description">
          Taking control of your health starts with planning. By establishing goals, creating a routine, and finding a support system, you can unlock the numerous benefits of a healthy lifestyle, including:
        </p>
        <Link to="/quizintro" className="btn btn-primary">
          Start Planning Your Journey Today!
        </Link>
        <h2 className="planning-title">Hitting Your Health Goals</h2>
        <p className="planning-description">
          Personalized nutrition insights reveal what's working so you can make smarter choices. 
        </p>
      </div>
    </div>
  );
}
