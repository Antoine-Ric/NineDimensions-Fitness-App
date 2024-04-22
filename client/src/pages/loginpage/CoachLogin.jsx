import "./LoginPage.css"; // Reusing the same CSS for consistency
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CoachLogin = () => {
  const navigate = useNavigate();
  const [coachForm, setCoachForm] = useState({
    Email: "",
    Password: "",
    isCoach: 1,
  });
  const [error, setError] = useState(0);

  const handleChange = (e) => {
    setCoachForm({
      ...coachForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/account/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(coachForm),
      });
      const data = await response.json();
      if (data.status_code !== 200) {
        setError(1); // Show error if login fails
      } else {
        navigate(`/coach/dashboard/${data.ID}`); // Navigate to the coach's dashboard on successful login
        setError(0);
      }
    } catch (error) {
      // Ideally, handle the error with more detailed feedback
      setError(1);
    }
  };
  const handleCoachLoginClick = () => {
    navigate("/Login");
  }


  return (
    <div className="loginpage">
      <section className="login-form-section">
        <div className="login-form">
          <h1>Coach Login</h1>
          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input type="email" name="Email" onChange={handleChange} required />
            <label>Password</label>
            <input
              type="password"
              name="Password"
              onChange={handleChange}
              required
            />
            <button type="submit">Log In</button>
          </form>
          <button onClick={handleCoachLoginClick}>Member Login</button>
        </div>
        {error === 1 ? (
          <p className="error">Invalid Email or Password</p>
        ) : null}
      </section>
    </div>
  );
};

export default CoachLogin;
