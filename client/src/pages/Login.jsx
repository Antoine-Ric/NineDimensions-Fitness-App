import "./Login.css";
import { useState } from "react";

const LoginPage = () => {
  const [myform, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...myform,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    try {
      const response = await fetch("/api/account/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(myform),
      });
      const data = await response.json();
      console.log(data);
      if (data.success) {
      }
    } catch (error) {}
  };

  return (
    <div className="loginpage">
      <section className="login-form-section">
        <div className="login-form">
          <h1 className="member-login">Member Login</h1>
          <form onSubmit={handleSubmit}>
            <label>Username</label>
            <input
              type="text"
              name="username"
              onChange={handleChange}
              required
            />
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              required
            />
            <button type="submit">Log In</button>
            <button type="button" style={{ marginLeft: '10px' }}>Sign Up</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;