import React from "react";
import QuizIntro from "../components/QuizIntro";
import Footer from "../components/Footer";
import "./QuizIntro.css";

const Home = () => {
    return (
        <div className="home-container">
            <QuizIntro />
            <Footer />   
        </div>
    )
}

export default WelcomeQuiz;