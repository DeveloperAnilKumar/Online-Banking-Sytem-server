const AccountForm = require("../model/AccountForm");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

exports.accountOpen = async (req, res) => {
  try {
    const {
      username,
      firstName,
      lastName,
      gender,
      email,
      password,
      conformPassword,
      mobile,
      address,
      city,
      state,
      pinCode,
      aadharCard,
      panCard,
      accountType,
    } = req.body;

    if (
      !username ||
      !firstName ||
      !lastName ||
      !gender ||
      !email ||
      !password ||
      !mobile ||
      !address ||
      !city ||
      !state ||
      !pinCode ||
      !aadharCard ||
      !panCard ||
      !accountType ||
      !conformPassword
    ) {
      res.status(403).json({
        success: false,
        message: "all filed required",
      });
      return;
    }

    const isAccountExits = await AccountForm.findOne({
      email: email,
      aadharCard: aadharCard,
      panCard: panCard,
    });
    if (isAccountExits) {
      res.status(403).json({
        success: false,
        message:
          "An account with this email, aadharCard, and panCard combination already exists",
      });
      return;
    }

    if (password !== conformPassword) {
      res.status(403).json({
        success: false,
        message: "password and conform password not match",
      });
      return;
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const accountNo = Math.floor(Math.random() * 9999999999);

    const accountDetails = await AccountForm.create({
      username,
      firstName,
      lastName,
      gender,
      email,
      password: hashPassword,
      mobile,
      address,
      city,
      state,
      pinCode,
      aadharCard,
      panCard,
      accountType,
      accountNo,
    });

    res.status(201).json({
      message: "account created successfully",
      success: true,
      accountDetails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const account = await AccountForm.findOne({
      $or: [{ username }, { email }],
    });

    if (!account) {
      res.status(403).json({
        success: false,
        message: "account does not exits",
      });
      return;
    }

    const isPassword = await bcrypt.compare(password, account.password);

    if (!isPassword) {
      res.status(403).json({
        success: false,
        message: "invalid password",
      });
      return;
    }

    const payload = {
      id: account._id,
      email: account.email,
    };

    const token = await jwt.sign(payload, "anilkumar", {
      expiresIn: "24d",
    });

    account.token = token;
    account.password = undefined;

    const option = {
      expire: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: true,
    };

    res.cookie("token", token, option).status(200).json({
      success: true,
      message: "login successfully",
      token,
      account,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




