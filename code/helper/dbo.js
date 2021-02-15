const mongoose = require("mongoose");
const ModelUsers = require("./ModelUser");
const ModelQA = require("./ModelQA");

//Connection String to MongoDB in the cloud
const connectionstring =
  "mongodb://mike:denton@" +
  "cluster0-shard-00-00.ebbh2.mongodb.net:27017," +
  "cluster0-shard-00-01.ebbh2.mongodb.net:27017," +
  "cluster0-shard-00-02.ebbh2.mongodb.net:27017/" +
  "CommunityToken" +
  "?ssl=true&replicaSet=atlas-p7z0yx-shard-0&authSource=admin&retryWrites=true&w=majority";

class DBO {
  constructor() {
    //Setup DB
    mongoose
      .connect(connectionstring, {
        useNewUrlParser: true,
        useFindAndModify: false,
      })
      .then(
        () => {
          console.log("Mongoose connected successfully");
        },
        (error) => {
          console.log("Mongoose could not connect to database:" + error);
        }
      );
  }

  createNewUser = async (newuser) => {
    try {
      console.log("start create new user");
      console.log(newuser);

      const newUser = new ModelUsers({
        UserName: newuser.username,
        PublicAddress: newuser.address,
        TokenBalance: 50,
        isLoggedIn: false,
      });

      const user = await newUser.save();
      if (user) {
        console.log(`Successfully added user to DB`);
      }
      return user;
    } catch (err) {
      console.log(`Error occurred in adding user to DB():${err}`);
    }
  };
  //added
  loginUser = async (username) => {
    const User = await ModelUsers.findOneAndUpdate(
      { UserName: username },
      { isLoggedIn: true },
      { new: true }
    );
    console.log(User);
    return User;
  };

  findAllUsers = async () => {
    const AllUsers = await ModelUsers.find({});
    //console.log(all);
    return AllUsers;
  };

  findUser = async (username) => {
    const User = await ModelUsers.findOne({ UserName: username });
    console.log(User);
    return User;
  };

  createQuestion = async (question) => {
    console.log("start create question");
    const newQuestion = new ModelQA.question({
      UserName: question.username,
      QuestionText: question.question,
      QuestionCost: question.cost,
    });

    await newQuestion.save();
  };

  findAllQuestions = async () => {
    const AllQuestions = await ModelQA.question.find({});
    //console.log(all);
    return AllQuestions;
  };

  findQuestionByID = async (qid) => {
    const Question = await ModelQA.question.findById(qid);
    return Question;
  };

  saveAnswerToQuestion = async (answer) => {
    const result = await ModelQA.question.findById(answer.qid);
    var newAnswer = new ModelQA.answer({
      UserName: answer.username,
      AnswerText: answer.answer,
    });
    result.Answers.push(newAnswer);
    await result.save();
  };

  declareAnswerWinner = async (winner) => {
    console.log("DeclareWinner");
    await ModelQA.question.findOneAndUpdate(
      { _id: winner.qid, "Answers._id": winner.aid },
      { "Answers.$.IsWinner": true }
    );
  };
}

module.exports = DBO;
