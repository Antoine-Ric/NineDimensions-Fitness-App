const DashBoardFood = () => {
  const imgurl =
    "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";


   
  return (
    <div>
      <div className="Breakfast">
        <h2>Breakfast</h2>
        <div className="breakfast-main">
          <img width={150} src={imgurl} alt="" />
          <p>egg toast calories: 150</p>
          <button className="swap-food-btn">swap</button>
        </div>
      </div>
      <div className="Lunch">
        <h2>Lunch</h2>
        <div className="breakfast-main">
          <img width={150} src={imgurl} alt="" />
          <p>egg toast calories: 150</p>
          <button className="swap-food-btn">swap</button>
        </div>
      </div>
      <div className="Dinner">
        <h2>Dinner</h2>
        <div className="breakfast-main">
          <img width={150} src={imgurl} alt="" />
          <p>egg toast calories: 150</p>
          <button className="swap-food-btn">swap</button>
        </div>
      </div>
    </div>
  );
};

export default DashBoardFood;
