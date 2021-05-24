import React, { useState, useEffect } from "react";
import axios from "axios";

function Search() {
  const container = {
    border: "solid grey 1px",
    height: "500px",
    minWidth: "280px",
    width: "30%",
    textAlign: "center",
    overflow: "scroll",
    marginBottom: 20,
  };

  const grid = {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
  };

  const styles = {
    flex: 1,
    minWidth: 80,
    width: "20%",
    height: 50,
    padding: 5,
    border: "0.5px solid black",
    margin: 5,
    fontSize: "10px",
  };

  const [allData, setAllData] = useState([]); //hold all info we retreive from json placeholder
  const [filteredData, setFilteredData] = useState(allData); //hold a copy of the first state and then second state

  //onChange method of the TextInput component.
  //within title property we are doing a search of the value that the user entered
  //into the textbox and will return the value if it is not equal to -1
  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];
    console.log(value);
    result = allData.filter((data) => {
      return data.title.search(value) !== -1;
    });
    setFilteredData(result);
  };

  useEffect(() => {
    axios("https://jsonplaceholder.typicode.com/albums/1/todos/")
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
    <div style={container}>
      <div style={{ margin: "10px" }}>
        <label>Search:</label>
        <input type="text" onChange={(event) => handleSearch(event)} />
      </div>
      <div style={grid}>
        {filteredData.map((value, index) => {
          return (
            <div key={value.id} style={styles}>
              {value.title}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Search;
