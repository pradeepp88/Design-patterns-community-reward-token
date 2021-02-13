const mongoose = require('mongoose');

//Connection String to MongoDB in the cloud
const connectionstring =  "mongodb://mike:denton@"
    +"cluster0-shard-00-00.ebbh2.mongodb.net:27017,"
    +"cluster0-shard-00-01.ebbh2.mongodb.net:27017,"
    +"cluster0-shard-00-02.ebbh2.mongodb.net:27017/"
    +"CommunityToken"
    +"?ssl=true&replicaSet=atlas-p7z0yx-shard-0&authSource=admin&retryWrites=true&w=majority";


class DBO {
}

module.exports = DBO;