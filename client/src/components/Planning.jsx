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
        <div className="planning-box"></div>
        <div className="coaching-section">
          <h2 className="planning-title">Want to inspire the next generation?</h2>
          <p className="planning-description">
            You can help someone start their own fitness journey by signing up to be a coach for our platform.
          </p>
          <Link to="/coachquiz" className="btn btn-primary">
            Begin your Coaching Journey
          </Link>
        </div>
        <h2 className="hitting-title">Hitting Your Health Goals</h2>
        <p className="number blue-bold">1</p>
        <h2 className="title-subsection">Track food, fitness & fasting</h2>
        <p className="planning-description">
          Personalized nutrition insights reveal what's working so you can make smarter choices. 
        </p>
        <br></br>
        <p className="number blue-bold">2</p>
        <h2 className="title-subsection">Learn what works</h2>
        <p className="planning-description">
          Insightful tutoring and custom lessons from vetted trainers. 
        </p>
        <br></br>
        <p className="number blue-bold">3</p>
        <h2 className="title-subsection">Change your habits and reach your goals</h2>
        <p className="planning-description">
          Personalized metrics that offer insight on how to lead a healthier lifestyle. 
        </p>
      </div>
    </div>
  );
}
