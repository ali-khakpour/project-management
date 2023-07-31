const { default: mongoose, model, Types } = require("mongoose");

const UserSchema = new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  username: { type: String, unique: true, required: true },
  password: { type: String,  },
  confirmPassword: { type: String,},
  mobile: { type: String, unique: true, required: true },
  skills: { type: [String], defualt: [] },
  email: { type: String, unique: true, required: true },
  team: { type: [Types.ObjectId], default: [] },
  rols: { type: [String], default: ["USERS"] },
});

const UserModle = model("user", UserSchema);

module.exports = { UserModle };
