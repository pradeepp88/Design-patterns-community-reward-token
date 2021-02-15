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
  if (User.isLoggedIn) {
    res.json({
      isLoggedIn: User.isLoggedIn,
      username: User.UserName,
      address: User.PublicAddress,
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
      })
    } else {
      res.json({ exist: false })
    }
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

//Get User
//http://localhost:8000/users?username=1
router.get('/', async function (req, res, next) {
  console.log('Login:')
  console.log(req.query)

  let User = await dbo.findUser(req.query.username)
  console.log('User Query Complete')
  if (User.isLoggedIn) {
    res.json({
      isLoggedIn: User.isLoggedIn,
      username: User.UserName,
      address: User.PublicAddress,
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
      })
    } else {
      res.json({ exist: false })
    }
  }
})

module.exports = router
