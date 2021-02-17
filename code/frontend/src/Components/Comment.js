import React from "react";
import Card from "./Card/Card";
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
      <Card cost = {props.cost} comment={props.comment} commentId={props.commentId} user={props.user} loggedInUser={props.loggedInUser}/>
    </div>
  );
};

export default Comment;
