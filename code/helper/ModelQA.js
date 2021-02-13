const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
    UserName:String,
    AnswerText:String,
    IsWinner:  {
        type: Boolean,
        default: false
    }
}); 
const Answer = mongoose.model('Answer',AnswerSchema,'CommunityQuestionAnswers');


const QuestionSchema = new mongoose.Schema({
    UserName:String,
    QuestionText:String,
    QuestionCost:String,
    Answers:[ AnswerSchema ] 
});




const Question = mongoose.model('Question',QuestionSchema,'CommunityQuestionAnswers');
module.exports = {
    question: Question,
    answer: Answer
}