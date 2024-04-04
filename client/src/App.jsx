import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/loginpage/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Profile from "./pages/loginpage/profile.jsx"; // Ensure this is capitalized if it's a component

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
}

export default App;
