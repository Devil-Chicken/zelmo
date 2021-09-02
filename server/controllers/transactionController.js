const db = require('../models/bankModel');
const fetch = require('node-fetch');
const transactionController = {};

// QUERY THE TRANSACTION DB and return the information we need
transactionController.viewTransactions = (req, res, next) => {
  console.log('enterted middleware')
  // console.log('HEADER', req.headers)
  const query = `
  SELECT *
  FROM transactions
  WHERE sender_id = '${req.headers.userid}' OR recipient_id = '${req.headers.userid}'
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
    console.log('transaction history received: ', response.rows[0]);
    res.locals.transactions = response.rows;
    return next();
  })
}





module.exports = transactionController;