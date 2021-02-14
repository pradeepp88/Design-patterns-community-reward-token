import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import Badge from "react-bootstrap/Badge";

const buttonStyle = {
  margin: ".1rem",
  width: "50px",
  height: "1.5rem",
  padding: ".4rem",
  borderRadius: ".5rem",
  outline: "none",
  background: "white",
};

class LikeButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      likes: 0,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const noOfLikes = this.state.likes + 1;
    this.setState({
      likes: noOfLikes,
    });
  }

  render() {
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <FontAwesomeIcon
          style={buttonStyle}
          onClick={(e) => this.handleClick(e)}
          icon={faThumbsDown}
        />
        <Badge pill variant="primary">
          {this.state.likes} {this.state.likes === 1 ? "DownVote" : "DownVotes"}
        </Badge>
      </div>
    );
  }
}

export default LikeButton;
