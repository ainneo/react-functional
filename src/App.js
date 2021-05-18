import React from "react";
import Search from "./components/Search";

function App() {
  const styles = {};
  const containerText = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div>
      <div style={containerText}>
        <h1>Searching, Filtering, Loading, Sorting with Hooks</h1>
      </div>
      <Search />
    </div>
  );
}

export default App;
