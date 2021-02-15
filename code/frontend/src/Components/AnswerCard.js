import React from "react";
import LikeButton from "./LikeButton";
import Timer from "./Timer";
import DislikeButton from "./DislikeButton";
import "./Card/Card.css";
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

class AnswerCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isWinner: props.isWinner || false
    }
  }

  handleSelect = async () => {
    const commentId = this.props.commentId || '602821c7fd54bb8078c1f26f';
    const answerId = this.props.answerId || '6028269515dbee8a0cc1043a';
    await fetch(`http://localhost:8000/qa/winner?qid=${commentId}&aid=${answerId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    });
    this.setState({ isWinner: true });
  }

  render() {
    return (
      <div>
        <Timer />
        <Chip
          icon={<FaceIcon />}
          label={this.props.user}
        />
        <div className={this.state.isWinner ? 'cardWinner' : 'card'}>
          {this.props.answer}
          <LikeButton data={this.props.answer} />
          <DislikeButton />
          <Button
            variant="contained"
            color="primary"
            startIcon={<CheckCircleIcon />}
            onClick={this.handleSelect}
          >
            Select
        </Button>
        </div>
      </div>
    );
  }
}

export default AnswerCard;
