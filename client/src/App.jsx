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

export default App;

