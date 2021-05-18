import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [allData, setAllData] = useState([]); //hold all info we retreive from json placeholder
  const [filteredData, setFilteredData] = useState(allData); //hold a copy of the first state and then second state

  //onChange method of the TextInput component.
  const handleSearch = (event) => {};

  useEffect(() => {
    axios("https://jsonplaceholder.typicode.com/albums/1/photos")
      .then((response) => {
        console.log(response.data);
        setAllData(response.data);
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.log("Error getting fake data: " + error);
      });
  }, []);

  return (
    <div className="App">
      <div style={{ margin: "0 auto", marginTop: "10%" }}>
        <label>Search:</label>
        <input type="text" onChange={(event) => handleSearch(event)} />
      </div>
    </div>
  );
}

export default App;
