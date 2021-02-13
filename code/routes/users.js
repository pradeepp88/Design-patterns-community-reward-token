var express = require('express');
var router = express.Router();
const DBO = require('../helper/dbo');

//Setup DBO
let dbo = new DBO();

//Login User
//http://localhost:8000/users?username=1&address=2
router.get('/',  async function(req, res, next) {   
  console.log('Login:');
  console.log(req.query);
  const User = await dbo.findUser(req.query.username);
  console.log('User Query Complete');
  res.send(User != null && User.PublicAddress==req.query.address);
});

//Register User
//http://localhost:8000/users?username=1&address=2
router.post('/', function(req, res, next) {  
  console.log('Register:');
  console.log(req.query);
  dbo.createNewUser(req.query);
  res.send(true);
});

module.exports = router;
