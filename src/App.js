import React from "react";
import LoadMore from "./components/LoadMore";
import Search from "./components/Search";
import Sort from "./components/Sort";

function App() {
  const container = {
    maxWidth: 1200,
    margin: "0 auto",
    padding: 20,
  };

  const containerComponents = {
    height: 800,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "center",
  };

  const containerText = {
    textAlign: "center",
  };

  return (
    <div style={container}>
      <div style={containerText}>
        <h1>Searching, Filtering, Loading, Sorting with Hooks</h1>
      </div>
      <div style={containerComponents}>
        <Search />
        <LoadMore />
        <Sort />
      </div>
    </div>
  );
}

export default App;
