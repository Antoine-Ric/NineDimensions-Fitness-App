import React from "react";
import CoachQuestions from "../components/CoachQuestions";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const Home = () => {
    return (
        <div className="home-container">
            <CoachQuestions/>  
        </div>
    )
}

export default Home;