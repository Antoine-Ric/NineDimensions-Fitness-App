import React from "react";
// Import your CSS file here if you have one, e.g.:
// import './DashBoardExercises.css';

const exercises = [
  {
    id: 1,
    name: "Push-ups",
    description:
      "Perform a push-up by lowering your body to the ground and pushing back up.",
  },
  {
    id: 2,
    name: "Sit-ups",
    description: "Lie on your back and lift your torso up towards your thighs.",
  },
  {
    id: 3,
    name: "Squats",
    description:
      "Stand with your feet shoulder-width apart and squat down as if sitting in a chair.",
  },
  // Add more exercises as needed
];

const DashBoardExercises = () => {
  return (
    <div className="dashboard-exercises">
      <h2>Exercises List</h2>
      <ul>
        {exercises.map((exercise) => (
          <li key={exercise.id}>
            <strong>{exercise.name}</strong>
            <p>{exercise.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashBoardExercises;
