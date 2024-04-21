import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";


const ProfilePage = () => {
  const navigate = useNavigate();

  const [userProfile, setUserProfile] = useState({
    name: "Jane Doe",
    age: 28,
    goals: "Complete a triathlon",
  });

  const coachProfile = {
    name: "Coach Williams",
    expertise: "Triathlon Training",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting profile update:", userProfile);
    // Integrate with your backend to update the user profile
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/account/logout");
      if (!response.ok) {
        throw new Error("Failed to log out");
      }
      const data = await response.json();
      console.log(data);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleDeleteAccount = () => {
    console.log("Deleting account...");
    // Implement account deletion functionality here, with confirmation
  };

  const backClick = () => {
    navigate(`/dashboard/M001`);
  }

  return (
    <div className="profile-page">
      <button className="backbutton" onClick={backClick}>Back to dashboard</button>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="name"
            value={userProfile.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Birthday:
          <input
            type="date"
            name="age"
            value={userProfile.age}
            onChange={handleChange}
          />
        </label>
        <label>
          Goals:
          <textarea
            name="goals"
            value={userProfile.goals}
            onChange={handleChange}
            style={{ width: "100%", height: "150px" }} // Adjust width and height as needed
          />
        </label>
        <button type="submit">Save Changes</button>
      </form>

      <h3>Coach Info</h3>
      <div>
        <strong>Name:</strong> {coachProfile.name}
      </div>
      <div>
        <strong>Expertise:</strong> {coachProfile.expertise}
      </div>

      {/* Log Out and Delete Account Buttons */}
      <button onClick={handleLogout} className="logout-btn">
        Log Out
      </button>
      <button onClick={handleDeleteAccount} className="delete-account-btn">
        Delete Account
      </button>
    </div>
  );
};

export default ProfilePage;
