import React from "react";
import { withRouter } from "react-router-dom";
import LoginForm from "./LoginForm";
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
      cost: null
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ comment: event.target.value });
  }

  handleRewardsChange = (e)=>{
    this.setState({cost: e.target.value})
  }

  populateQuestions = async () => {
    const response = await fetch(`http://localhost:8000/qa`);
    const questions = await response.json();
    const commentsList = []
    questions.forEach(comment =>
      commentsList.push({
        commentId: comment._id,
        comment: comment.QuestionText,
        user: comment.UserName,
        cost: comment.QuestionCost
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
    if (this.state.cost > this.props.location.state.user.points){
      alert("Not enough balance in your account");
      return;
    }

  const username = this.props.location.state.user.username;
  const balance = this.props.location.state.user.points-this.state.cost;
  this.props.location.state.user.points = balance;
  await fetch('http://localhost:8000/users/balance', {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        balance: balance
      })
    })


    await fetch(`http://localhost:8000/qa/question?username=${username}&question=${this.state.comment}&cost=${this.state.cost}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    });
    this.state.comment = "";
    this.state.cost = "";
    await this.populateQuestions();
  }

  render(){
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

    const headStyle = {
      textAlign: "center"
    }

    return (
      <div style={divStyle}>
        <div style = {headStyle}>
        <h1>
        Hi {this.props.location.state.user.username}! </h1>
        <h2><br/> Ask a question to the community (mention the reward) or answer them to earn rewards<br/> When you find the right answer, select winning answer</h2>
        Logged in as: {this.props.location.state.user.username}{" "}Balance: {this.props.location.state.user.points} points
        </div>
        
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
          <TextField
            id="outlined-basic"
            label="Reward points"
            variant="outlined"
            autoFocus
            onChange={(e) => this.handleRewardsChange(e)}
            value={this.state.cost}
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
            <Comment key={index} comment={c.comment} commentId={c.commentId} user={c.user} loggedInUser={this.props.location.state.user} cost={c.cost}/>
          </div>
        ))}
      </div>
    );
  }
}

export default withRouter(PostComment);
