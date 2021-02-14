import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import Badge from "react-bootstrap/Badge";

const LikeButton = () => {
  const [likes, setLikes] = useState(0);

  const handleClick = () => {
    const noOfLikes = likes + 1;
    setLikes(noOfLikes);
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <FontAwesomeIcon
        style={{
          margin: ".1rem",
          width: "50px",
          height: "1.5rem",
          padding: ".4rem",
          borderRadius: ".5rem",
          outline: "none",
          background: "white",
        }}
        onClick={(e) => handleClick(e)}
        icon={faThumbsUp}
      />
      <Badge pill variant="primary">
        {likes} {likes === 1 ? "Vote" : "Votes"}
      </Badge>
    </div>
  );
};

export default LikeButton;
