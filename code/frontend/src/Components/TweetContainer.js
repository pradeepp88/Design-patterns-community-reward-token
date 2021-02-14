import React from "react";
import Comment from "./Comment";
import { TextField, Button } from "@material-ui/core";
import SendRoundedIcon from "@material-ui/icons/SendRounded";

class TweetContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: "",
      commentsList: [],
      id: 1,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ comment: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.comment === "" || this.state.comment == null) {
      return;
    }
    var newComment = (
      <Comment key={this.state.id} comment={this.state.comment} />
    );
    var newComments = this.state.commentsList.slice();

    newComments.push(newComment);
    this.setState({
      comment: "",
      commentsList: newComments,
      id: this.state.id + 1,
    });
  }

  //   handle submit on when user presses enter
  inputKeyDown = (event) => {
    const val = event.target.value;
    if (event.key === "Enter" && val) {
      this.handleSubmit(event);
    }
  };

  render() {
    const divStyle = {
      display: "flex",
      flexDirection: "column",
      margin: ".5rem",
      justifyCntent: "center",
      alignItems: "center",
    };

    const formStyle = {
      display: "flex",
      flexDirection: "column",
      margin: ".5rem",
      justifyCntent: "center",
      alignItems: "center",
    };

    return (
      <div style={divStyle}>
        <h1>{this.props.status}</h1>
        <form style={formStyle}>
          <TextField
            id="outlined-basic"
            label="Your question"
            variant="outlined"
            autoFocus
            onChange={(e) => this.handleChange(e)}
            onKeyDown={(e) => this.inputKeyDown(e)}
            value={this.state.comment}
            multiline
            rows={10}
          />

          <hr />
          <Button
            variant="contained"
            color="secondary"
            size="medium"
            startIcon={<SendRoundedIcon />}
            onClick={(e) => this.handleSubmit(e)}
          >
            Post
          </Button>
        </form>

        {this.state.commentsList}
      </div>
    );
  }
}

export default TweetContainer;
