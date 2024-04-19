import React, { useState } from 'react';
import '../styles/QuizQuestions.css';
import { useNavigate } from "react-router-dom";

const CoachQuizQuestions = () => {
    const navigate = useNavigate();
    
    // Define questions and choices
    const questions = [
        "What is your full name?",
        "Thanks! Now for your goals as a Coach,",
        "When were you born?",
        "Input your email and password"
    ];

    const goalChoices = ["Lose Weight", "Gain Weight", "Gain Muscle", "Manage Stress"];

    // State to track current question index, user answers, and user's data
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [fullName, setFullName] = useState('');
    const [activityLevel, setActivityLevel] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // Function to handle moving to the next question
    const nextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    // Function to handle moving to the previous question
    const prevQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    // Function to handle selecting activity level
    const handleActivityLevelSelection = (e) => {
        setActivityLevel(e.target.value);
    };

    // Function to handle selecting birth date
    const handleBirthDateChange = (e) => {
        setBirthDate(e.target.value);
    };

    // Function to handle email input
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    // Function to handle password input
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    // Function to toggle visibility of password input
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    // Function to handle full name input
    const handleFullNameChange = (e) => {
        setFullName(e.target.value);
    };

    // Function to handle form submission
    const handleSubmit = async () => {
        try {
            const response = await fetch("/api/coach/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fullName,
                    activityLevel,
                    birthDate,
                    email,
                    password,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                navigate(`/coachDashboard/${data.ID}`);
            } else {
                // Handle error
            }
        } catch (error) {
            // Handle error
        }
    };

    return (
        <div className="question-card-container">
            {/* Display current question */}
            <div className="question-card">
                <h2>{currentQuestion === 1 ? `${questions[currentQuestion]} ${fullName}` : questions[currentQuestion]}</h2>

                {/* Input field for user's answer or choices for activity levels */}
                {currentQuestion === 0 ? (
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={handleFullNameChange}
                    />
                ) : currentQuestion === 1 ? (
                    goalChoices.map((level, index) => (
                        <div key={index}>
                            <input
                                type="radio"
                                id={level}
                                name="activityLevel"
                                value={level}
                                checked={activityLevel === level}
                                onChange={handleActivityLevelSelection}
                            />
                            <label htmlFor={level}>{level}</label>
                        </div>
                    ))
                ) : currentQuestion === 2 ? (
                    <input
                        type="date"
                        value={birthDate}
                        onChange={handleBirthDateChange}
                    />
                ) : (
                    <div>
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <div className="password-input">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            <button onClick={toggleShowPassword}>{showPassword ? "Hide" : "Show"}</button>
                        </div>
                    </div>
                )}
            </div>

            {/* Navigation buttons */}
            <div>
                <button onClick={prevQuestion} disabled={currentQuestion === 0} className="nav-button">Previous</button>
                {currentQuestion !== questions.length - 1 ? (
                    <button onClick={nextQuestion} className="nav-button">Next</button>
                ) : (
                    <button onClick={handleSubmit} className="submit-button">Submit</button>
                )}
            </div>
        </div>
    );
}

export default CoachQuizQuestions;
