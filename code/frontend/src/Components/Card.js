import React from "react";
import LikeButton from "./LikeButton";
import DislikeButton from "./DislikeButton";
import "./Card.css";
import Timer from "./Timer";
import Answer from "./Answer";
import AnswerCard from "./AnswerCard";

const Card = (props) => {
  return (
    <>
      <div className="answer">
        <Answer />
      </div>

      <div className="card">
        <Timer />
        {props.comment}
        <LikeButton />
        <DislikeButton />
      </div>
    </>
  );
};

export default Card;
