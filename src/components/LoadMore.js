import { useState } from "react";

const LoadMore = () => {
  const container = {
    border: "solid grey 1px",
    height: "500px",
    minWidth: "280px",
    width: "30%",
    textAlign: "center",
    overflow: "scroll",
    marginBottom: 20,
  };

  const containerButton = {
    padding: 20,
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
      <div style={containerButton}>
        {isFetching && <p>Fetching items...</p>}
        {!isFetching && <button onClick={loadMoreItems}>Load more</button>}
      </div>
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
