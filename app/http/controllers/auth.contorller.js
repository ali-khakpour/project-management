const { validationResult } = require("express-validator");
const { hashPassword, singToken } = require("../../modules/hashPassword");
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

  async login(req, res, next) {
    try {
      const { password, username } = req.body;
      const user = await UserModle.findOne({ username })
      const token = singToken({ username })
      user.token = token;
      await user.save()
      res.status(200).json({
        statusCode: res.statusCode,
        message: "ورود موفقیت آمیز",
        token,
      })
    } catch (error) {
      console.log(error + "32");
      next(error)
    }
  }
  resetPassword() { }
}

module.exports = { AuthController: new AuthController() };
