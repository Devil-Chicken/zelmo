const db = require('../models/bankModel');
const fetch = require('node-fetch');
const transactionController = {};

// QUERY THE TRANSACTION DB and return the information we need
transactionController.viewTransactions = (req, res, next) => {
  const query = `
  SELECT *
  FROM transactions
  WHERE sender_id = '${res.user.account_id}
  `
}





module.exports = transactionController;