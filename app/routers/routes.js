const { Router } = require("express");
const authRouter = require("./auth.routes");
const userRouter = require("./user.routes");
const projectRouter = require("./project.routes");
const teamRouter = require("./team.routes");

const allRouter = Router();

allRouter.use('/auth', authRouter);
allRouter.use('/user', userRouter);
allRouter.use('/team', teamRouter);
allRouter.use('/project', projectRouter);


module.exports = allRouter