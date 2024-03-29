import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router-dom for navigation

export default function QuizIntro() {
  return (
    <div>
      <h1>Welcome to NineDimensions</h1>
      <p>Prepare yourself for an exciting quiz experience!</p>
      <Link to="/wquiz" className="btn btn-primary">
        Continue
      </Link>
    </div>
  );
}
