import React from "react";
// import LikeButton from "./LikeButton";
// import DislikeButton from "./DislikeButton";
import "./Card.css";
import Timer from "../Timer";
import Answer from "../Answer";
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';

const Card = (props) => {
  return (
    <div>
      <Chip
          icon={<FaceIcon />}
          label={props.user}
        />
      <div className="card">
        <Timer />
        
        {props.comment}
        {/* <LikeButton />
        <DislikeButton /> */}
      </div>
      <div className="answer">
        <Answer commentId={props.commentId} user={props.user} loggedInUser={props.loggedInUser}/>
      </div>
    </div>
  );
};

export default Card;
