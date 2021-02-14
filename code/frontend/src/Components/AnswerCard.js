import React from "react";
import LikeButton from "./LikeButton";
import DislikeButton from "./DislikeButton";
import "./Card.css";

const AnswerCard = (props) => {
  return (
    <>
      <div className="card">
        {props.data}
        <LikeButton data={props.data} />
      </div>
    </>
  );
};

export default AnswerCard;
