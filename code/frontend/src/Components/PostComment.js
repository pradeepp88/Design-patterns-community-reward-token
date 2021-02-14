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

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ comment: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("Logged in user >>>", this.props.location.state.user);

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

    // save question
    // http://localhost:8000/qa/question?username=1&question=text&cost=123
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

export default withRouter(PostComment);
