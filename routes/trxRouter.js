const express = require("express");
const {
  withdrawalAmount,
  depositAmount,
  transferFunds,
  getTransactionDetails,
} = require("../controller/transactionController");

const trxRouter = express.Router();

trxRouter.post("/withdrawal", withdrawalAmount);
trxRouter.post("/deposit", depositAmount);
trxRouter.post("/transfer", transferFunds);
trxRouter.get("/statement", getTransactionDetails);


module.exports = trxRouter;
