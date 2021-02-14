import React from "react";
import Card from "./Card";
// import Answer from "./Answer";

const Comment = (props) => {
  const divStyle = {
    display: "flex",
    margin: "0.5rem",
    flexDirection: "row",
    justifyContent: "space-around",
  };

  return (
    <div style={divStyle}>
      <Card comment={props.comment} />
    </div>
  );
};

export default Comment;
