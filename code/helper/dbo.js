const mongoose = require('mongoose');
const ModelUsers = require('./ModelUser');
const ModelQA = require('./ModelQA');

//Connection String to MongoDB in the cloud
const connectionstring =  "mongodb://mike:denton@"
    +"cluster0-shard-00-00.ebbh2.mongodb.net:27017,"
    +"cluster0-shard-00-01.ebbh2.mongodb.net:27017,"
    +"cluster0-shard-00-02.ebbh2.mongodb.net:27017/"
    +"CommunityToken"
    +"?ssl=true&replicaSet=atlas-p7z0yx-shard-0&authSource=admin&retryWrites=true&w=majority";


class DBO {
    constructor (){
        //Setup DB
        mongoose
            .connect(connectionstring, {useNewUrlParser:true, useFindAndModify: false })
            .then(()=>{console.log('Mongoose connected successfully');},
            error => {console.log("Mongoose could not connect to database:"+error)}
        )
    }

    createNewUser = (newuser) => {
        console.log('start create new user');
        console.log(newuser);
        //username=1&address=2
        const newUser = new ModelUsers({
            UserName:newuser.username,
            PublicAddress:newuser.address,
            TokenBalance:50
        })
        newUser.save(function(err){
            if(err) console.log(`Error occurred in adding user to DB():${err}`)
            else {
                console.log(`Successfully added user to DB`);
            }
        });
    }

    findAllUsers = async () =>{
        const AllUsers = await ModelUsers.find({});
        //console.log(all);
        return AllUsers;
    }

    findUser = async (_username) =>{
        const User = await ModelUsers.findOne({UserName:_username});
        //console.log(all);
        return User;
    }

    createQuestion = (question) =>{
        console.log('start create question');
        const newQuestion = new ModelQA.question({
            UserName:question.username,
            QuestionText:question.question,
            QuestionCost:question.cost
        });

        newQuestion.save(function(err){
            if(err) console.log(`Error occurred in adding question to DB():${err}`)
            else {
                console.log(`Successfully added question to DB`);
            }
        });
    }

    findAllQuestions = async () =>{
        const AllQuestions = await  ModelQA.question.find({});
        //console.log(all);
        return AllQuestions;
    }

    findQuestionByID = async (qid) =>{
        const Question = await ModelQA.question.findById(qid);
        return Question;
    }

    saveAnswerToQuestion =  (answer) =>{
        ModelQA.question.findById(answer.qid, (err, result) =>{
            var newAnswer = new ModelQA.answer({
                UserName:answer.username,
                AnswerText:answer.answer
            });
            result.Answers.push(newAnswer);
            result.save(function(err){
                if(err) console.log(`Error occurred in adding answer to DB():${err}`)
                else {
                    console.log(`Successfully added answer to DB`);
                }
            });
        });
    }

    declareAnswerWinner = (winner) =>{
        console.log("DeclareWinner");
        ModelQA.question.findOneAndUpdate(
            { "_id": winner.qid, "Answers._id": winner.aid },
            { "Answers.$.IsWinner" : true },
            function(err,doc) {
                if(err) console.log(`Error occurred in declaring winner answer to DB():${err}`)
                else {
                    console.log(`Successfully added declaring winner answer to DB`);
                }
            }
        );        
    }

}

module.exports = DBO;