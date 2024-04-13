const mongoose = require("mongoose");

const accountFormSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pinCode: {
    type: Number,
    required: true,
  },
  aadharCard: {
    type: Number,
    required: true,
  },
  panCard: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    enum: ["saving", "current"],
    required: true,
  },
  accountNo: {
    type: Number,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
  },
  openDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("AccountForm", accountFormSchema);
