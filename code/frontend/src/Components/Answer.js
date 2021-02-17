import React from "react";
// import Comment from "./Comment";
import { TextField, Button } from "@material-ui/core";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import AnswerCard from "./AnswerCard";
import SCO from '../sco';
let sco = new SCO();

class Answer extends React.Component {
  constructor(props) {
    super(props);

    // register username
    this.state = {
      username: "",
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

  populateAnswers = async () => {
    const response = await fetch(`http://localhost:8000/qa/${this.props.commentId}`);
    const comment = await response.json();

    this.setState({
      commentsList: []
    });

    const commentsList = [];
    let isWinnerFound = false;
    comment.Answers.forEach(a => {
      if (a.IsWinner) isWinnerFound = true;
      commentsList.push({
        answerId: a._id,
        answer: a.AnswerText,
        user: a.UserName,
        isWinner: a.IsWinner
      });
    });

    if (isWinnerFound) {
      commentsList.forEach(c => c.isDisable = true);
    }

    this.setState({
      commentsList: commentsList
    });
  }

  componentDidMount = async () => {
    await this.populateAnswers().then(window.scrollTo(0, 0));
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    if (this.state.comment === "" || this.state.comment == null) {
      return;
    }
    const username = this.props.loggedInUser.username;
    await fetch(`http://localhost:8000/qa/answer?qid=${this.props.commentId}&username=${username}&answer=${this.state.comment}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    });

    this.state.comment = "";
    await this.populateAnswers();
  }
  //   handle submit on when user presses enter
  inputKeyDown = (event) => {
    const val = event.target.value;
    if (event.key === "Enter" && val) {
      this.handleSubmit(event);
    }
  };

  handleAnswerSelect = async (answerId) => {
    const question = await fetch(`http://localhost:8000/qa/search/${this.props.commentId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    });
    const owner = await question.json();
    const username = this.props.loggedInUser.username;
    console.log(`Getting Owner of Question ${this.props.commentId}`, owner.Username);
    console.log("logged in user", username);
    const qCost = owner.QuestionCost;
    if (owner.Username === username){    
      const commentId = this.props.commentId;
      fetch(`http://localhost:8000/qa/winner?qid=${commentId}&aid=${answerId}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      }).then(async ()=>{
        console.log("AnswerId:",answerId);
        const answerOwner = await fetch(`http://localhost:8000/qa/srcanswer?aid=${answerId}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          }
        })
        const answerOwnerJson = await answerOwner.json();
        console.log("Answer Owner:",answerOwnerJson.Answers);
        const answerOwner1 = answerOwnerJson.Answers;
        return answerOwner1;
      }).then(async (answerOwner1)=>{
        const balance = await fetch(`http://localhost:8000/users/getbalance?username=${answerOwner1}`,{
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          }
        })
        const balanceJson = await balance.json();
        const oldBalance = balanceJson.balance;
        console.log("Old Balance is",oldBalance);
        return {
          username: answerOwner1,
          balance: oldBalance
        }
      }).then(async (answerOwner1)=>{
        console.log("Transfer check - Answer Owner:", answerOwner1.address);
        console.log("Transfer check - Old Balance is",answerOwner1.balance);
        console.log("Question Cost: ", qCost);
        const newBalance = answerOwner1.balance+qCost;
        await fetch('http://localhost:8000/users/balance', {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: answerOwner1.username,
          balance: newBalance
        })
        })
        console.log(`Balance for ${answerOwner1.address} updated to ${newBalance}`);
        const key = prompt('Please enter your private key (this will not be saved and used only for one transaction)');
        //sco.declareWinner(owner.address,answerOwner1.address,qCost,key);
        
        alert("Transaction Success! Answer owner rewarded");
        this.populateAnswers();
      })
    
    }
    else{
      alert("Only question owner can select the winner");
      return;
    }
  }

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
            label="Answer"
            variant="outlined"
            autoFocus
            onChange={(e) => this.handleChange(e)}
            onKeyDown={(e) => this.inputKeyDown(e)}
            value={this.state.comment}
            multiline
          />

          <hr />
          <Button
            variant="contained"
            color="secondary"
            size="medium"
            startIcon={<SendRoundedIcon />}
            onClick={(e) => this.handleSubmit(e)}
          >
            Answer
          </Button>
        </form>

        {this.state.commentsList.map((c, index) => (
          <div key={index}>
            <AnswerCard answer={c.answer}
              answerId={c.answerId}
              isWinner={c.isWinner}
              user={c.user}
              commentId={this.props.commentId}
              handleAnswerSelect={this.handleAnswerSelect}
              isDisable={c.isDisable}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default Answer;
