var express = require('express')
var router = express.Router()
const DBO = require('../helper/dbo')

//Setup DBO
let dbo = new DBO()

//Login User
//http://localhost:8000/users?username=1&address=2
router.get('/', async function (req, res, next) {
  console.log('Login:')
  console.log(req.query)

  let User = await dbo.findUser(req.query.username)
  console.log('User Query Complete')
  User = await dbo.loginUser(req.query.username)
  if (
    User != null &&
    User.PublicAddress == req.query.address
  ) {
    res.json({
      exist: true,
      username: User.UserName,
      address: User.PublicAddress,
      points: User.TokenBalance,
      isLoggedIn: User.isLoggedIn
    })
  } else {
    res.json({ exist: false })
  }
  
})

//Register User
//http://localhost:8000/users
router.post('/', async function (req, res, next) {
  console.log('Register:')
  console.log(req.body)
  const registeredUser = await dbo.createNewUser(req.body)
  res.json({ username: registeredUser.UserName })
})

//Update UserBalance
//http://localhost:8000/users/balance(body-username&balance)
router.post('/balance', async function (req,res, next){
  console.log('Updating Balance for user:', req.body.username);
  console.log('New Balance:',req.body.balance);
  const updateUser = await dbo.updateUserBalance(req.body.username,req.body.balance);
  res.json({updateUser})
})

//Get UserBalance
//GET-http://localhost:8000/users/getbalance?username=pradeepnew
router.get('/getbalance', async function (req,res,next){
  console.log("Getting User Balance for ",req.query.username);
  const userBalance = await dbo.findUser(req.query.username);
  res.json({balance: userBalance.TokenBalance});
})

//Logout User
//http://localhost:8000/users/logout(body-username&isLoggedIn)
router.post('/logout', async function (req,res, next){
  console.log('Updating isLoggedIn for user:', req.body.username);
  console.log('isLoggedIn:',req.body.isLoggedIn);
  const updateUser = await dbo.updateUserStatus(req.body.username,req.body.isLoggedIn);
  res.json({username: req.body.username, isLoggedIn: req.body.isLoggedIn})
})

//Get User
//http://localhost:8000/users/search?username=1
router.get('/search', async function (req, res, next) {
  console.log('Query User:')
  console.log(req.query)

  let User = await dbo.findUser(req.query.username)
  console.log('User Query Complete')
  if (User.isLoggedIn) {
    res.json({
      isLoggedIn: User.isLoggedIn,
      username: User.UserName,
      address: User.PublicAddress,
      points: User.TokenBalance
    })
  } else {
    User = await dbo.loginUser(req.query.username)
    if (
      User != null &&
      User.PublicAddress == req.query.address &&
      User.isLoggedIn
    ) {
      res.json({
        exist: true,
        username: User.UserName,
        address: User.PublicAddress,
        points: User.TokenBalance
      })
    } else {
      res.json({ exist: false })
    }
  }
})

module.exports = router
