const { default: mongoose } = require("mongoose");

mongoose
  .connect("mongodb://0.0.0.0:27017/auth-user")
  .then((res) => console.log("connected to DB"))
  .catch((err) => console.log("unConnected to DB"));
