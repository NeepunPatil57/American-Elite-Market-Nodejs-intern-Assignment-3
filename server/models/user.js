const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const JWT_SECRET='abcd';
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  bio: { type: String, default: '' },
  pfp: { type: String, default: '' },
  following_ids: [{ type: String, default: '' }],
  followers_ids: [{ type: String, default: '' }],
  following: { type: Number, default: 0 },
  followers: { type: Number, default: 0 },
  requests: [{
    sender_id: { type: String, default: '' },
    accepted: { type: Boolean, default: false }
  }]
});

UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() },JWT_SECRET);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
}

const User = mongoose.model("User", UserSchema);
module.exports = User;
