import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/loginpage/Login.jsx";
import Dashboard from "./pages/dashboardpage/Dashboard.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Profile from "./pages/profile/ProfilePage.jsx"; 
import Layout from "./components/Layout.jsx";
import './App.css'; 
import Coachprofile from "./pages/profile/Coachprofile.jsx";
import CoachDashboard from "./pages/dashboardpage/CoachDashboard.jsx";
import Home from './pages/Home.jsx'; 
import QuizIntro from './components/QuizIntro';
import WelcomeQuiz from './pages/WelcomeQuiz';
import CoachQuiz from './pages/CoachQuiz';
import CoachLogin from "./pages/loginpage/CoachLogin.jsx";


function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/quizintro" element={<QuizIntro />} />
        <Route path="/welcomequiz" element={<WelcomeQuiz />} />
        <Route path="/coachquiz" element={<CoachQuiz />} />
        <Route path="/coachlogin" element={<CoachLogin />} />
      </Route>

      {/* Private Routes within PrivateRoute for authentication check */}
      <Route element={<PrivateRoute />}>
        <Route path="/coach/profile/:ID" element={<Coachprofile />} />
        <Route path="/coach/dashboard/:ID" element={<CoachDashboard />} />
        <Route path="/dashboard/:ID" element={<Dashboard />} />
        <Route path="/profile/:ID" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App
