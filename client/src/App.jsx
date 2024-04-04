import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/loginpage/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Profile from "./pages/loginpage/profile.jsx"; // Ensure this is capitalized if it's a component
import React from 'react';
import { BrowserRouter as Router, Routes, Route }
from 'react-router-dom';
import './App.css'; 
import NavBar from './components/NavBar';
import Home from './pages/Home'; 
import Login from './pages/Login';
import QuizIntro from './components/QuizIntro';
import WelcomeQuiz from './pages/WelcomeQuiz';


function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      {/*add more public routes here*/}
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard/:ID" element={<Dashboard />} />
        <Route path="/profile/:ID" element={<Profile />} />
      </Route>
    </Routes>
  );
    <Router>
      <NavBar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path = '/quizintro' element={<QuizIntro />} />
        <Route path="/welcomequiz" element={<WelcomeQuiz />} />
      </Routes>
    </Router>
  );
}

export default App
