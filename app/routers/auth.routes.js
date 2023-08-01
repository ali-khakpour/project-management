const { Router } = require("express");
const {registerValidator, loginValidator} = require("../http/validations/auth");
const { AuthController } = require("../http/controllers/auth.contorller");
const expressValidatorMaper = require("../http/middlewares/expressValidatorMaper");
const authRouter = Router();

authRouter.post(
  "/register",
  registerValidator(),
  expressValidatorMaper,
  AuthController.rigester
);
authRouter.post(
  "/login",
  loginValidator(),
  expressValidatorMaper,
  AuthController.login
);

module.exports = authRouter;
