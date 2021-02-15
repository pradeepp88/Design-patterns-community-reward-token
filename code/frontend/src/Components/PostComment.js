import React from "react";
import { withRouter } from "react-router-dom";

import Comment from "./Comment";
import { TextField, Button } from "@material-ui/core";
import SendRoundedIcon from "@material-ui/icons/SendRounded";

class PostComment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: "",
      commentsList: [],
      id: 1,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ comment: event.target.value });
  }

  populateQuestions = async () => {
    const response = await fetch(`http://localhost:8000/qa`);
    const questions = await response.json();
    const commentsList = []
    questions.forEach(comment =>
      commentsList.push({
        commentId: comment._id,
        comment: comment.QuestionText,
        user: comment.UserName
      })
    );
    this.setState({
      commentsList: commentsList
    });
  }

  componentDidMount = async () => {
    console.log("Logged in user >>>", this.props.location.state.user);
    await this.populateQuestions();
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    if (this.state.comment === "" || this.state.comment == null) {
      return;
    }
    const username = this.props.location.state.user.username;
    await fetch(`http://localhost:8000/qa/question?username=${username}&question=${this.state.comment}&cost=123`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    });
    this.state.comment = "";
    await this.populateQuestions();
  }

  render() {
    const divStyle = {
      display: "flex",
      flexDirection: "column",
      margin: ".5rem",
      justifyCntent: "center",
      alignItems: "center",
      width: "50%",
    };

    const formStyle = {
      display: "flex",
      flexDirection: "column",
      margin: ".5rem",
      justifyCntent: "center",
      alignItems: "center",
      width: "100%",
    };

    return (
      <div style={divStyle}>
        <h1>{this.props.status}</h1>
        LoggedIn: {this.props.location.state.user.username}
        <form style={formStyle}>
          <TextField
            id="outlined-basic"
            label="Your question"
            variant="outlined"
            autoFocus
            onChange={(e) => this.handleChange(e)}
            value={this.state.comment}
            multiline
            rows={3}
            fullWidth
          />

          <hr />
          <Button
            variant="contained"
            color="secondary"
            size="medium"
            startIcon={<SendRoundedIcon />}
            onClick={this.handleSubmit}
          >
            Post
          </Button>
        </form>
        {this.state.commentsList.map((c, index) => (
          <div key={index}>
            <Comment key={index} comment={c.comment} commentId={c.commentId} user={c.user} loggedInUser={this.props.location.state.user} />
          </div>
        ))}
      </div>
    );
  }
}

export default withRouter(PostComment);
