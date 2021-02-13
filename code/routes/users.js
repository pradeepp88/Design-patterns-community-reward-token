var express = require('express');
var router = express.Router();

//Register User
//http://localhost:8000/users?username=1&address=2
router.get('/', function(req, res, next) {   
  console.log('Register:');
  console.log(req.query);
  res.send('User is Registered');
});

//Login User
//http://localhost:8000/users?username=1&address=2
router.post('/', function(req, res, next) {  
  console.log('Login:');
  console.log(req.query);

  res.send(true);
});

module.exports = router;
