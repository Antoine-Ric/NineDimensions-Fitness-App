import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./coachdash.css";

const CoachDashboard = () => {
  const { ID } = useParams();
  const navigate = useNavigate();
  const [trainees, setTrainees] = useState([]);
  const [selectedTrainee, setSelectedTrainee] = useState(null);
  const [assignments, setAssignments] = useState({});
  const [exercises, setExercises] = useState([]);
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchTrainees = async () => {
      try {
        const response = await fetch(`/api/coach/${ID}/trainees`);
        if (!response.ok) {
          throw new Error("Failed to fetch trainees");
        }
        const data = await response.json();
        setTrainees(data);
        initializeAssignments(data);
      } catch (error) {
        console.error("Error fetching trainees:", error);
      }
    };
    fetchTrainees();

    // Fetch exercises data
    const fetchExercises = async () => {
      try {
        const response = await fetch("/api/exercises");
        if (!response.ok) {
          throw new Error("Failed to fetch exercises");
        }
        const data = await response.json();
        setExercises(data);
        console.log("exercises", data);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };
    fetchExercises();

    // Fetch foods data
    const fetchFoods = async () => {
      try {
        const response = await fetch("/api/foods");
        if (!response.ok) {
          throw new Error("Failed to fetch foods");
        }
        const data = await response.json();
        setFoods(data);
        console.log("foods", data);
      } catch (error) {
        console.error("Error fetching foods:", error);
      }
    };
    fetchFoods();
  }, [ID]);

  const initializeAssignments = (trainees) => {
    const initialAssignments = {};
    trainees.forEach((trainee) => {
      initialAssignments[trainee.Email] = {
        meals: { breakfast: null, lunch: null, dinner: null },
        exercises: [],
      };
    });
    setAssignments(initialAssignments);
  };

  const handleSelectTrainee = (trainee, alreadyBeingselected) => {
    if (alreadyBeingselected) {
      setSelectedTrainee(null);
      return;
    }
    setSelectedTrainee(trainee);
  };

  const handleAssignMeal = (mealType, foodId) => {
    if (selectedTrainee) {
      setAssignments({
        ...assignments,
        [selectedTrainee.Email]: {
          ...assignments[selectedTrainee.Email],
          meals: {
            ...assignments[selectedTrainee.Email].meals,
            [mealType]: foodId,
          },
        },
      });
    }
  };

  const toggleExerciseAssignment = (exerciseId) => {
    if (!selectedTrainee) return;
    const currentAssignments = assignments[selectedTrainee.Email].exercises;
    const isCurrentlyAssigned = currentAssignments.includes(exerciseId);

    let newAssignments;
    if (isCurrentlyAssigned) {
      newAssignments = currentAssignments.filter((id) => id !== exerciseId);
    } else {
      if (currentAssignments.length >= 4) return;
      newAssignments = [...currentAssignments, exerciseId];
    }

    setAssignments({
      ...assignments,
      [selectedTrainee.Email]: {
        ...assignments[selectedTrainee.Email],
        exercises: newAssignments,
      },
    });
  };

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
  const onProfileClick = () => {
    navigate(`/profile/${ID}`);
    console.log(`$profile/${ID}`);
  };

  return (
    <div className="CoachDashboard">
      <button onClick={handleLogoutClick}>Logout</button>
      <button onClick={onProfileClick}>P</button>
      <h1>Coach Dashboard</h1>
      <div className="trainees-section">
        {trainees.map((trainee) => (
          <button
            key={trainee.Email}
            className="trainee-card"
            onClick={() =>
              handleSelectTrainee(
                trainee,
                selectedTrainee && selectedTrainee.Email === trainee.Email
              )
            }
          >
            {trainee.Fullname}
            {selectedTrainee &&
              selectedTrainee.Email === trainee.Email &&
              " (selected)"}
          </button>
        ))}
      </div>
      {selectedTrainee && (
        <div className="assignments-section">
          <h2>Assign Meals for {selectedTrainee.Fullname}</h2>
          {["breakfast", "lunch", "dinner"].map((mealType) => (
            <div key={mealType}>
              <h3>{mealType.charAt(0).toUpperCase() + mealType.slice(1)}</h3>
              <select
                value={assignments[selectedTrainee.Email].meals[mealType] || ""}
                onChange={(e) => handleAssignMeal(mealType, e.target.value)}
              >
                <option value="">Select {mealType}</option>
                {foods.map((food) => (
                  <option key={food.FoodID} value={food.FoodID}>
                    {food.Name}
                  </option>
                ))}
              </select>
            </div>
          ))}
          <h2>Assign Exercises for {selectedTrainee.Fullname}</h2>
          {exercises.map((exercise) => (
            <button
              key={exercise.id}
              onClick={() => toggleExerciseAssignment(exercise.id)}
              className={
                assignments[selectedTrainee.Email].exercises.includes(
                  exercise.id
                )
                  ? "assigned"
                  : ""
              }
              disabled={
                assignments[selectedTrainee.Email].exercises.length >= 4 &&
                !assignments[selectedTrainee.Email].exercises.includes(
                  exercise.id
                )
              }
            >
              {exercise.Name}
            </button>
          ))}
          <br />
          <button>Assign</button>
        </div>
      )}
    </div>
  );
};

export default CoachDashboard;
