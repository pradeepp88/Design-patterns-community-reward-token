const mongoose = require('mongoose');
const ModelUsers = require('./ModelUser');

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
            .connect(connectionstring, {useNewUrlParser:true})
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
            if(err) console.log(`Error occurred in adding user to DB():${error}`)
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

}

module.exports = DBO;