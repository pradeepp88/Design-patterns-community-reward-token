var express = require("express");
var router = express.Router();

//Getting All Questions
// GET-http://localhost:8000/qa
router.get("/", function (req, res, next) {
  console.log("all questions");
  res.send("all questions");
});

//Getting a Question and it's Answers
//GET-http://localhost:8000/qa/1
router.get("/:qid", function (req, res, next) {
  console.log("question id");
  console.log(req.params.qid);

  res.send("get question");
});

//Saving Question
//POST-http://localhost:8000/qa/question?username=1&question=text&cost=123
router.post("/question", function (req, res, next) {
  console.log("Saving Question:");
  console.log(req.query);

  res.send(true);
});

//Saving Answer
//POST-http://localhost:8000/qa/answer?qid=1&username=1&answer=text
router.post("/answer", function (req, res, next) {
  console.log("Saving Answer:");
  console.log(req.query);

  res.send(true);
});

//Winning Answer
//POST-http://localhost:8000/qa/winner/1
router.post("/winner/:aid", function (req, res, next) {
  console.log("Winning Answer:");
  console.log(req.params.aid);

  res.send(true);
});

module.exports = router;
