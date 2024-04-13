const express = require("express");
const {
  withdrawalAmount,
  depositAmount,
  transferFunds,
} = require("../controller/transactionController");

const trxRouter = express.Router();

trxRouter.post("/withdrawal", withdrawalAmount);
trxRouter.post("/deposit", depositAmount);
trxRouter.post("transfer", transferFunds);

module.exports = trxRouter;
