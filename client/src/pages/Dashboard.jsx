import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { ID } = useParams();
  const [user, setUser] = useState(null); 
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/account/info/${ID}`);
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await response.json();
        setUser(data.user); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [ID]);

  if (!user) {
    return <div>Loading...</div>; 
  }

  const handleLogoutClick = async () => {
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

  return (
    <div>
      <h2>Dashboard For: {user.Firstname + " " + user.Lastname}</h2>
      <p>Name: {user.Firstname}</p>
      <p>Lastname: {user.Lastname}</p>
      <p>Email: {user.Email}</p>
      <button onClick={handleLogoutClick}>LOG OUT</button>
    </div>
  );
};

export default Dashboard;
