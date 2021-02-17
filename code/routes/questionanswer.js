var express = require("express");
var router = express.Router();
const DBO = require('../helper/dbo');
//Setup DBO
let dbo = new DBO();

//Getting All Questions
// GET-http://localhost:8000/qa
router.get("/", async function (req, res, next) {
  console.log("all questions");
  const allQuestions = await dbo.findAllQuestions();
  res.send(allQuestions);
});



//Getting a Question's owner
//GET-http://localhost:8000/qa/search/602821c7fd54bb8078c1f26f
router.get("/search/:qid", async function (req, res, next) {
  console.log("question id 1");
  console.log(req.params.qid);
  const question = await dbo.findQuestionByID(req.params.qid)
  console.log("owner is:", question.UserName)
  console.log("Answer List",question.Answers);
  res.send({Username: question.UserName, QuestionCost:question.QuestionCost, Answers: question.Answers});
});

//Getting a Answers's owner
//GET-http://localhost:8000/qa/srcanswer?602b724e8073c34bb42555ca
router.get("/srcanswer", async function (req, res, next) {
  console.log("answer search");
  console.log(req.query.aid);
  const question = await dbo.findAnswerByID(req.query)
  console.log("Question",question);
  const answer = question.Answers;
  const usernameAnswer = answer.find(answer=>answer._id==req.query.aid);
  console.log("Username",usernameAnswer.UserName);
  res.json({ Answers:usernameAnswer.UserName });
});

//Getting a Question and it's Answers
//GET-http://localhost:8000/qa/602821c7fd54bb8078c1f26f
router.get("/:qid", async function (req, res, next) {
  console.log("question id 2");
  console.log(req.params.qid);
  const question = await dbo.findQuestionByID(req.params.qid)
  console.log(question)
  res.send(question);
});

//Saving Question
//POST-http://localhost:8000/qa/question?username=1&question=text&cost=123
router.post("/question", async function (req, res, next) {
  console.log("Saving Question:");
  console.log(req.query);
  await dbo.createQuestion(req.query);
  res.send(true);
});

//Saving Answer
//POST-http://localhost:8000/qa/answer?qid=602821c7fd54bb8078c1f26f&username=band&answer=answer
router.post("/answer", async function (req, res, next) {
  console.log("Saving Answer:");
  console.log(req.query);
  await dbo.saveAnswerToQuestion(req.query);
  res.send(true);
});

//Winning Answer
//POST-http://localhost:8000/qa/winner?qid=602821c7fd54bb8078c1f26f&aid=6028269515dbee8a0cc1043a
router.post("/winner", async function (req, res, next) {
  console.log("Winning Answer:");
  console.log(req.query);
  await dbo.declareAnswerWinner(req.query);
  res.send(true);
});

module.exports = router;
