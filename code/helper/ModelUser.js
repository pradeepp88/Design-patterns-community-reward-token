const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
  UserName: String,
  PublicAddress: String,
  TokenBalance: Number,
  isLoggedIn: Boolean,
})
const User = mongoose.model('User', UserSchema, 'CommunityUsers')
module.exports = User
