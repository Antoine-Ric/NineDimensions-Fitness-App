import "./LoginPage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
  const navigate = useNavigate();
  const [myform, setForm] = useState({
    Email: "",
    Password: "",
  });
  const [error, setError] = useState(0);



  const handleChange = (e) => {
    setForm({
      ...myform,
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
        body: JSON.stringify(myform),
      });
      const data = await response.json();
      console.log("hereeeeeee",data);
      if(data.status_code !== 200){
        setError(1);
      }
      else{
        navigate(`/dashboard/${data.ID}`);
        setError(0);
      }
    } catch (error) {

    }
  };

  return (
    <div className="loginpage">
      <section className="login-form-section">
        <div className="login-form">
          <h1 className="member-login">Member Login</h1>
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
        </div>
        {error === 1 ? <p className="error">Invalid Email or Password</p> :' '}
      </section>
    </div>
  );
};

export default LoginPage;
