const { validationResult } = require("express-validator");
const { hashPassword } = require("../../modules/hashPassword");
const { UserModle } = require("../../models/user");

class AuthController {
  async rigester(req, res, next) {
    try {
      const { username, email, mobile, password } = req.body;
      const hash_password = hashPassword(password);
      const user = await UserModle.create({
        username,
        email,
        mobile,
        password: hash_password,
      });
      return res.json(user);
    } catch (error) {
      next();
    }
  }
  login() {}
  resetPassword() {}
}

module.exports = { AuthController: new AuthController() };
