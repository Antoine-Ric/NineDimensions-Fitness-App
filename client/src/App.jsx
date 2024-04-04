import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/loginpage/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Profile from "./pages/loginpage/profile.jsx"; 
import Layout from "./components/Layout.jsx";
import './App.css'; 
import NavBar from './components/NavBar';
import Home from './pages/Home.jsx'; 
import QuizIntro from './components/QuizIntro';
import WelcomeQuiz from './pages/WelcomeQuiz';


function App() {
  return (
    <Routes>
      
      <Route element={<Layout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/quizintro" element={<QuizIntro />} />
        <Route path="/welcomequiz" element={<WelcomeQuiz />} />
      </Route>

      {/* Private Routes within PrivateRoute for authentication check */}
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard/:ID" element={<Dashboard />} />
        <Route path="/profile/:ID" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App
