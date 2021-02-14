import React from "react";
import TweetContainer from "./Components/TweetContainer";
import Login from "./Components/Login";

function App() {
  const divstyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div style={divstyle}>
      <Login />
      <TweetContainer status="Add a question" />
    </div>
  );
}

export default App;
