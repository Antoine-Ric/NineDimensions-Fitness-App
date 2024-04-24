import { useState, useEffect } from "react";

const DashBoardFood = () => {
  const imgurl =
    "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const [foods, setFoods] = useState([]);
  const [showSwapList, setShowSwapList] = useState(false);
  const [activeMeal, setActiveMeal] = useState(null);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await fetch("/api/foods");
        if (!response.ok) {
          throw new Error("Failed to fetch foods");
        }
        const data = await response.json();
        setFoods(data);
      } catch (error) {
        console.error("Error fetching foods:", error);
      }
    };
    fetchFoods();
  }, []);

  const onSwapClick = (mealType) => {
    setActiveMeal(mealType);
    setShowSwapList(true);
  };

  const selectFood = (food) => {
    console.log(`Selected ${food.name} for ${activeMeal}`);
    setShowSwapList(false);
  };

  return (
    <div>
      <div className="Breakfast">
        <h2>Breakfast</h2>
        <div className="meal-main">
          <img width={150} src={imgurl} alt="Breakfast item" />
          <p>egg toast calories: 150</p>
          <button
            onClick={() => onSwapClick("Breakfast")}
            className="swap-food-btn"
          >
            swap
          </button>
        </div>
      </div>
      <div className="Lunch">
        <h2>Lunch</h2>
        <div className="meal-main">
          <img width={150} src={imgurl} alt="Lunch item" />
          <p>egg toast calories: 150</p>
          <button
            onClick={() => onSwapClick("Lunch")}
            className="swap-food-btn"
          >
            swap
          </button>
        </div>
      </div>
      <div className="Dinner">
        <h2>Dinner</h2>
        <div className="meal-main">
          <img width={150} src={imgurl} alt="Dinner item" />
          <p>egg toast calories: 150</p>
          <button
            onClick={() => onSwapClick("Dinner")}
            className="swap-food-btn"
          >
            swap
          </button>
        </div>
      </div>
      {showSwapList && (
        <div className="swap-list">
          <h3>Select a food for {activeMeal}</h3>
          <ul>
            {foods.map((food, index) => (
              <li key={food.FoodID} onClick={() => selectFood(food)}>
                {food.Name} - {food.Calories} calories
              </li>
            ))}
          </ul>
          <button onClick={() => setShowSwapList(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default DashBoardFood;
