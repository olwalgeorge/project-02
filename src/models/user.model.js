// w03-project-2/app/models/contact.model.js
// Model for user data defining schema

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user_id: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  avatar_url: { type: String },
  first_name: String,
  last_name: String,
  joined_date: Date,
  last_login_ip: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
