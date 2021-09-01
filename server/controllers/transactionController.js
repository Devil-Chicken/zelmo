const db = require('../models/bankModel');
const fetch = require('node-fetch');
const transactionController = {};

// QUERY THE TRANSACTION DB and return the information we need
transactionController.viewTransactions = (req, res, next) => {
  const query = `
  SELECT *
  FROM transactions
  WHERE sender_id OR recipient_id = '${res.user.account_id}
  `

  db.query(query, (err, response) => {
    console.log('entered transaction history query');
    if (err) {
      console.log(err);
      return next({
        log: 'Error in transaction history middleware',
        message: { err: 'Error getting transaction history'}
      })
    }
    console.log('transaction history received: ', response);
    res.locals.transactions = response.rows;
  })
}





module.exports = transactionController;