import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { ID } = useParams();

  const [userProfile, setUserProfile] = useState({
    Firstname: "",
    Age: "",
    goals: "",
    Weight: "",
  });

  const [coachProfile, setCoachProfile] = useState({
    name: "",
    expertise: "",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`/api/account/info/${ID}`);
        if (!response.ok) {
          console.log("response", response);
          throw new Error("Failed to fetch");
        }
        const data = await response.json();
        console.log("my userrr", data);
        if (data && data.user) {
          setUserProfile(data.user);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserProfile();
  }, []);

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
    navigate(`/dashboard/${ID}`);
  };

  return (
    <div className="profile-page">
      <button className="backbutton" onClick={backClick}>
        Back to dashboard
      </button>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            value={userProfile.Firstname}
            placeholder={userProfile.Firstname}
            onChange={handleChange}
          />
        </label>
        <label>
          Birthday:
          <input
            type="date"
            value={userProfile.age}
            onChange={handleChange}
          />
        </label>
        <label>
          Weight:
          <input
          type="number"
            name="Weight"
            value={userProfile.Weight}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Save Changes</button>
      </form>

      <h3>Coach Info</h3>
      <div>
        <strong>Name:</strong>
      </div>
      <div>
        <strong>Expertise:</strong> 
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
