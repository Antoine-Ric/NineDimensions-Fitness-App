import React, { useState } from 'react';
import '../styles/QuizQuestions.css';
import { useNavigate } from "react-router-dom";

const QuizQuestions = () => {
    const navigate = useNavigate();
    // Define questions and choices
    const questions = [
        "What is your full name?",
        "Thanks! Now for your goals,",
        "What is your baseline activity level?",
        "Please select which sex we should use to calculate your calorie needs.",
        "When were you born?",
        "Input your body metrics",
        "Almost there! Create your account"
    ];

    const goalChoices = ["Lose Weight", "Gain Weight", "Gain Muscle", "Manage Stress"];
    const activityLevelChoices = ["Not Very Active", "Lightly Active", "Active", "Very Active"];
    const genderChoices = ["Male", "Female"];

    // State to track current question index, user answers, and user's name
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState(Array(questions.length).fill(''));
    const [fullName, setfullName] = useState('');
    const [selectedGoals, setSelectedGoals] = useState([]);
    const [selectedActivityLevel, setSelectedActivityLevel] = useState('');
    const [gender, setGender] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [goalWeight, setGoalWeight] = useState('');
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

    // Function to handle updating user answer
    const handleAnswerChange = (e) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = e.target.value;
        setAnswers(newAnswers);

        // If current question is the first question (index 0), update fullName state
        if (currentQuestion === 0) {
            setfullName(e.target.value);
        }
    };

    // Function to handle selecting goals
    const handleGoalSelection = (e) => {
        const goal = e.target.value;
        if (selectedGoals.includes(goal)) {
            setSelectedGoals(selectedGoals.filter(item => item !== goal));
        } else {
            setSelectedGoals([...selectedGoals, goal]);
        }
    };

    // Function to handle selecting activity level
    const handleActivityLevelSelection = (e) => {
        setSelectedActivityLevel(e.target.value);
    };


    // Function to handle selecting sex
    const handleGenderSelection = (e) => {
        setGender(e.target.value);
    };


    // Function to handle selecting birth date
    const handleBirthDateChange = (e) => {
        setBirthDate(e.target.value);
    };

    // Function to handle weight input
    const handleWeightChange = (e) => {
        setWeight(e.target.value);
    };

    // Function to handle height input
    const handleHeightChange = (e) => {
        setHeight(e.target.value);
    };

    // Function to handle goal weight input
    const handleGoalWeightChange = (e) => {
        setGoalWeight(e.target.value);
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

    // Function to handle form submission
    const handleSubmit = async () => {
        try {
            const response = await fetch("/api/account/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fullName,
                    selectedGoals,
                    selectedActivityLevel,
                    gender,
                    birthDate,
                    weight,
                    height,
                    goalWeight,
                    email,
                    password,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                navigate(`/dashboard/${data.ID}`);
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
                <h2>{questions[currentQuestion]} {currentQuestion === 1 && fullName}</h2>

                {/* Input field for user's answer or choices for goals */}
                {currentQuestion === 0 ? (
                    <input
                        type="text"
                        value={answers[currentQuestion]}
                        onChange={handleAnswerChange}
                    />
                ) : currentQuestion === 1 ? (
                    goalChoices.map((goal, index) => (
                        <div key={index}>
                            <input
                                type="checkbox"
                                id={goal}
                                value={goal}
                                checked={selectedGoals.includes(goal)}
                                onChange={handleGoalSelection}
                            />
                            <label htmlFor={goal}>{goal}</label>
                        </div>
                    ))
                ) : currentQuestion === 2 ? (
                    activityLevelChoices.map((level, index) => (
                        <div key={index}>
                            <input
                                type="radio"
                                id={level}
                                name="activityLevel"
                                value={level}
                                checked={selectedActivityLevel === level}
                                onChange={handleActivityLevelSelection}
                            />
                            <label htmlFor={level}>{level}</label>
                        </div>
                    ))
                ) : currentQuestion === 3 ? (
                    genderChoices.map((gender, index) => (
                        <div key={index}>
                            <input
                                type="radio"
                                id={gender}
                                name="gender"
                                value={gender}
                                checked={gender === gender}
                                onChange={handleGenderSelection}
                            />
                            <label htmlFor={gender}>{gender}</label>
                        </div>
                    ))
                ) : currentQuestion === 4 ? (
                    <input
                        type="date"
                        value={birthDate}
                        onChange={handleBirthDateChange}
                    />
                ) : currentQuestion === 5 ? (
                    <div>
                        <input
                            type="number"
                            placeholder="Weight (lb)"
                            value={weight}
                            onChange={handleWeightChange}
                        />
                        <input
                            type="number"
                            placeholder="Height (in)"
                            value={height}
                            onChange={handleHeightChange}
                        />
                        <input
                            type="number"
                            placeholder="Goal Weight (lb)"
                            value={goalWeight}
                            onChange={handleGoalWeightChange}
                        />
                    </div>
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
                {currentQuestion !== questions.length - 1 ? (
                    <>
                        <button onClick={prevQuestion} disabled={currentQuestion === 0} className="nav-button">Previous</button>
                        <button onClick={nextQuestion} className="nav-button">Next</button>
                    </>
                ) : (
                    <button onClick={handleSubmit} className="submit-button">Submit</button>
                )}
            </div>
        </div>
    );
}

export default QuizQuestions;



