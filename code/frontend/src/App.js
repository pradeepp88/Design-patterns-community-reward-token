import React from "react";
import { Route, Switch } from "react-router-dom";
import TweetContainer from "./Components/TweetContainer";
import LoginForm from "./Components/LoginForm";
import Error from "./Components/Error";
import Navbar from "./Components/Navbar";

function App() {
  const divstyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div>
      <Navbar />
      <div style={divstyle}>
        <Switch>
          <Route path="/" component={LoginForm} exact />
          <Route
            path="/home"
            render={(props) => <TweetContainer status="Add a question" />}
          />
          <Route component={Error} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
