import React from 'react';
import { Link } from 'react-router-dom'; 
import exerciseImageTwo from '../images/excercise_image_two.jpg';
import '../styles/QuizIntro.css';

export default function QuizIntro() {
  return (
    <div className="quiz-intro-container">
      <h1 className="quiz-intro-welcome">
        <span className="welcome-text">Welcome to</span> <br />
        <span className="quiz-intro-welcome">NineDimensions</span>
      </h1>
      <img src={exerciseImageTwo} alt="Exercise" className="quiz-intro-image" />
      <p></p>
      <Link to="/quizquestions" className="btn btn-primary">
        Continue
      </Link>
    </div>
  );
}
