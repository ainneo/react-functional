import React, { useState, useEffect } from "react";
import axios from "axios";
import { findByLabelText } from "@testing-library/dom";

function Search() {
  const [allData, setAllData] = useState([]); //hold all info we retreive from json placeholder
  const [filteredData, setFilteredData] = useState(allData); //hold a copy of the first state and then second state

  //onChange method of the TextInput component.
  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];
    console.log(value);
    result = allData.filter((data) => {
      return data.title.search(value) !== -1;
    });
    setFilteredData(result);
  };

  const styles = {
    display: "inline",
    minWidth: "100px",
    width: "20%",
    height: 50,
    float: "left",
    padding: 5,
    border: "0.5px solid black",
    margin: 5,
    fontSize: "10px",
  };

  const container = {
    height: "500px",
    minWidth: "280px",
    width: "30%",
    textAlign: "center",
    overflow: "scroll",
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
      <div style={{ padding: "10px" }}>
        <label>Search:</label>
        <input type="text" onChange={(event) => handleSearch(event)} />
      </div>
      <div>
        {filteredData.map((value, index) => {
          return (
            <div key={value.id}>
              <div style={styles}>{value.title}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Search;
