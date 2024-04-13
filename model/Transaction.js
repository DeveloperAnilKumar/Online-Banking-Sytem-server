const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  transactionDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  debitAmount: {
    type: Number,
  },
  creditAmount: {
    type: Number,
  },
  utr: {
    type: Number,
    required: true,
  },
  remark: {
    type: String,
  },
  fromAccount: {
    type: Number,
  },
  toAccount: {
    type: Number,
  },
  totalBalance: {
    type: Number,
    required: true,
  },
  transactionType: {
    type: String,
    enum: ["credit", "debit"],
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
