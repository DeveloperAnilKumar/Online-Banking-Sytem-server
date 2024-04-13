const Transaction = require("../model/Transaction");

const AccountForm = require("../model/AccountForm");

exports.withdrawalAmount = async (req, res) => {
  try {
    const { accountNo, amount } = req.body;
    const account = await AccountForm.findOne({ accountNo });
    if (!account) {
      res.status(403).json({
        success: false,
        message: "account no does not exits",
      });

      return;
    }

    if (account.balance < amount) {
      res.status(403).json({
        success: false,
        message: "insufficient balance",
      });
      return;
    }

    updateBalance = account.balance - amount;

    const updatedAccount = await AccountForm.findOneAndUpdate(
      { accountNo },
      { balance: updateBalance },
      { new: true }
    );

    const urtId = Math.floor(Math.random() * 999999999);

    const trx = await Transaction.create({
      debitAmount: amount,
      utr: urtId,
      totalBalance: updateBalance,
      transactionType: "debit",
      status: "completed",
    });

    res.status(200).json({
      message: "transaction successfully",
      success: true,
      updatedAccount,
      trx,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.depositAmount = async (req, res) => {
  try {
    const { accountNo, amount } = req.body;
    const account = await AccountForm.findOne({ accountNo });
    if (!account) {
      res.status(403).json({
        success: false,
        message: "account no does not exits",
      });

      return;
    }

    updateBalance = account.balance + amount;

    const updatedAccount = await AccountForm.findOneAndUpdate(
      { accountNo },
      { balance: updateBalance },
      { new: true }
    );

    const urtId = Math.floor(Math.random() * 999999999);

    const trx = await Transaction.create({
      creditAmount: amount,
      utr: urtId,
      totalBalance: updateBalance,
      transactionType: "credit",
      status: "completed",
    });

    res.status(200).json({
      message: "transaction successfully",
      success: true,
      updatedAccount,
      trx,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.transferFunds = async (req, res) => {
  try {
    const { senderAccountNo, receiverAccountNo, amount } = req.body;

    // Find sender and receiver accounts
    const senderAccount = await AccountForm.findOne({
      accountNo: senderAccountNo,
    });
    const receiverAccount = await AccountForm.findOne({
      accountNo: receiverAccountNo,
    });

    // Check if both accounts exist
    if (!senderAccount || !receiverAccount) {
      return res.status(404).json({
        success: false,
        message: "One or both accounts not found",
      });
    }

    // Check if sender has sufficient balance
    if (senderAccount.balance < amount) {
      return res.status(403).json({
        success: false,
        message: "Insufficient balance in sender account",
      });
    }

    // Update sender's balance
    const updatedSenderBalance = senderAccount.balance - amount;
    await AccountForm.findOneAndUpdate(
      { accountNo: senderAccountNo },
      { balance: updatedSenderBalance }
    );

    // Update receiver's balance
    const updatedReceiverBalance = receiverAccount.balance + amount;
    await AccountForm.findOneAndUpdate(
      { accountNo: receiverAccountNo },
      { balance: updatedReceiverBalance }
    );

    // Create transaction for sender
    const senderTransaction = await Transaction.create({
      debitAmount: amount,
      transactionType: "debit",
      status: "completed",
      fromAccount: senderAccount,
    });

    // Create transaction for receiver
    const receiverTransaction = await Transaction.create({
      creditAmount: amount,
      transactionType: "credit",
      status: "completed",
      toAccount: receiverAccount,
    });

    return res.status(200).json({
      success: true,
      message: "Funds transferred successfully",
      senderTransaction,
      receiverTransaction,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
