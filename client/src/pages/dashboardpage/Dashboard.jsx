import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DashFood from "../../components/DashBoardFood";
import DashExercise from "../../components/DashBoardExercises";
import "./dash.css"


const Dashboard = () => {
  const { ID } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
    const [coaches, setCoaches] = useState([]);
    const [error, setError] = useState(null);


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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/account/info/${ID}`);
        if (!response.ok) {
          console.log("response", response);
          throw new Error("Failed to fetch");
        }
        const data = await response.json();
        console.log("my userrr", data);
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [ID]);


   useEffect(() => {
     const fetchCoaches = async () => {
       try {
         const response = await fetch("/api/coaches/names");
         if (!response.ok) {
           console.log("Response:", response);
           throw new Error("Failed to fetch coach names");
         }
         const names = await response.json();
         setCoaches(names);
         console.log("Coach names:", names);
       } catch (error) {
         console.error("Error fetching coach names:", error);
         setError(error.message);
       }
     };

     fetchCoaches();
   }, []);


  if (!user) {
    return <div>Loadingg..</div>;
  }

  const onProfileClick = ()=>{
    navigate(`/profile/${ID}`);
  }


  return (
    <div className="DashboardPage">
      <div className="dashHeader">
        <h3>Nine Dimensions</h3>
        <button onClick={onProfileClick}>P</button>
      </div>
      <div className="MainContainer">
        <div className="sideNav">
          <div className="profile">
            <div className="nameAndAge">
              <h2>
                {user.Firstname} {user.Lastname}
              </h2>
              <h5>
                {user.Gender}, {user.Age} years old
              </h5>
            </div>
            <div className="heightAndWeight">
              <h4 style={{ color: "blue" }}>Height</h4>
              <h4>{user.Height} cm</h4>
              <h4 style={{ color: "blue" }}>Weight</h4>
              <h4>{user.Weight} kg</h4>
            </div>
          </div>
          <button>Goals</button>
          <button onClick={handleLogoutClick}>LOG OUT</button>
          <button onClick={() => {}}>Choose Coach</button>
          <ul>
            {coaches.map((name, index) => (
              <li key={index}>{name.FullName}</li>
            ))}
          </ul>
        </div>
        <div className="main">
          <DashFood />
        </div>
        <div className="exercises">
          <DashExercise />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
