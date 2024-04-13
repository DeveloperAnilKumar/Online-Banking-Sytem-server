const express = require("express");
const { accountOpen, login } = require("../controller/accountController");

const userRouter = express.Router();

userRouter.post("/open", accountOpen);
userRouter.post("/login", login);

module.exports = userRouter;
