import React, { useEffect, useState } from "react";

function Test(){
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/test");
        const mydata = await response.json();
        setData(mydata);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Server Message: {data.message}</h1>
    </div>
  );
}

export default Test;
