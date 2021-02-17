import React from "react";
import LikeButton from "./LikeButton";
import Timer from "./Timer";
import DislikeButton from "./DislikeButton";
import "./Card/Card.css";
import "./AnswerCard.css";
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

class AnswerCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isWinner: props.isWinner,
      isDisable: props.isDisable
    }
  }

  handleSelect = async () => {
    this.props.handleAnswerSelect(this.props.answerId);
  }

  render() {
    return (
      <div>
        <Chip
          icon={<FaceIcon />}
          label={this.props.user}
        />
        <div className={this.state.isWinner ? 'cardWinner' : 'answercard'}>
          {this.props.answer}
          <LikeButton data={this.props.answer} /><DislikeButton />
          <Button
            variant="contained"
            color="primary"
            startIcon={<CheckCircleIcon />}
            onClick={this.handleSelect}
            disabled={this.state.isDisable}
          >
            Winner
        </Button>
        </div>
      </div>
    );
  }
}

export default AnswerCard;
