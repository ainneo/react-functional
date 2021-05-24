import { useState, useEffect } from "react";
import axios from "axios";

const LoadMore = () => {
  const container = {
    height: "500px",
    minWidth: "280px",
    width: "30%",
    textAlign: "center",
    overflow: "scroll",
  };

  const grid = {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
  };

  const styles = {
    flex: 1,
    minWidth: 100,
    width: "20%",
    height: 50,
    padding: 5,
    border: "0.5px solid black",
    margin: 5,
    fontSize: "10px",
  };

  const [Items, setItems] = useState(Array.from(Array(5).keys(), (n) => n + 1));
  const [isFetching, setIsFetching] = useState(false);

  function loadMoreItems() {
    setIsFetching(true);

    //mocking an API call
    setTimeout(() => {
      setItems((prevState) => [
        ...prevState,
        ...Array.from(Array(5).keys(), (n) => n + prevState.length + 1),
      ]);
      setIsFetching(false);
    }, 2000);
  }
  return (
    <div style={container}>
      {isFetching && <p>Fetching items...</p>}
      {!isFetching && <button onClick={loadMoreItems}>Load more</button>}
      {Items.map((item, index) => {
        if (Items.length === index + 1) {
          return <div key={index}>Item {item} last</div>;
        } else {
          return <div key={index}>Item {item}</div>;
        }
      })}
    </div>
  );
};

export default LoadMore;
