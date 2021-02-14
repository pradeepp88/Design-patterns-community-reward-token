import React from "react";
// import LikeButton from "./LikeButton";
// import DislikeButton from "./DislikeButton";
import "./Card.css";
import Timer from "../Timer";
import Answer from "../Answer";

const Card = (props) => {
  return (
    <div>
      <div className="card">
        <Timer />
        {props.comment}
        {/* <LikeButton />
        <DislikeButton /> */}
      </div>
      <div className="answer">
        <Answer />
      </div>
    </div>
  );
};

export default Card;
