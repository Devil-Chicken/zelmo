const db = require('../models/bankModel');

const accountController = {};

// view balance
accountController.viewBalance = (req, res, next) => {
  const query = `
  SELECT balance
  FROM accounts
  WHERE account_id = 1
  `
  db.query(query, (err, response) => {
    if (err) {
      return next({
        log: 'Error in getting balance middleware',
        message: { err: 'Error occured in viewBalance account.Controller' }
      })
    }
    console.log('BALANCE', response);
    res.locals.viewBalance = response.rows;
    return next();
  })
}
// deposit money
accountController.depositBalance = (req, res, next) => {
  const query = `
  UPDATE accounts
  SET balance = (balance + 55555555)
  WHERE account_id = 1
  RETURNING balance
  `
  db.query(query, (err, response) => {
    if (err) {
      return next({
        log: 'Error in deposit middleware',
        message: { err: 'Error occured in the depositBalance account.Controller' }
      })
    }
    console.log('deposit balance: ', response);
    res.locals.depositBalance = response.rows;
    return next();
  })
}

// withdraw money
accountController.withdrawBalance = (req, res, next) => {
  const withdrawAmount = 500000000;
  const query = `
  UPDATE accounts
  SET balance = (balance - ${withdrawAmount})
  WHERE account_id = 1
  RETURNING balance
  `
  db.query(query, (err, response) => {
    if (err) {
      return next({
        log: 'Error in deposit middleware',
        message: { err: ' You broke!' }
      })
    }
    console.log('withdraw balance: ', response);
    res.locals.withdrawBalance = response.rows;
    return next();
  })
}


module.exports = accountController;