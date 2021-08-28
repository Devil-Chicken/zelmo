const db = require('../models/bankModel');

const transferController = {};

transferController.sendMoney = (req, res, next) => {
  const senderId = 1;
  const receiverID = 2;
  const sendAmount = 1;
  const query = `
    UPDATE accounts
    SET balance = (balance - ${sendAmount})
    WHERE account_id = ${senderId}
    RETURNING balance;
    
    UPDATE accounts
    SET balance = (balance + ${sendAmount})
    WHERE account_id = ${receiverID}
    RETURNING balance
    `
  db.query(query, (err, response) => {
    if (err) {
      return next({
        log: 'Error in send middlewar',
        message: { err: 'Insufficient balance' }
      })
    }
    console.log('sent ', response),
      res.locals.sendBalance = response.rows
    return next();
  })
}



module.exports = transferController;