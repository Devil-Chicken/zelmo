const db = require('../models/bankModel');

const transferController = {};

transferController.sendMoney = (req, res, next) => {
  const senderId = req.body.account_id;
  const receiverEmail = req.body.recipient_email;
  const sendAmount = req.body.transfer_amount;
  let receiverID;
  const rec_query = `
  SELECT account_id
  FROM users
  where email = '${receiverEmail}'
  `
  db.query(rec_query, (err, response) => {
    if (err) {
      console.log(err);
      return next({
        log: 'Error in transfer recipient middleware',
        message: { err: 'User not found' }
      })
    }
    if (response.rows.length == 0) {
      return next({
        log: 'Error in transfer recipient middleware',
        message: { err: 'User not found' }
      })
    }
    receiverID = response.rows[0].account_id;
    console.log('found recipient id from email: ', receiverID)
    const query2 = `
      UPDATE accounts
      SET balance = (balance - ${sendAmount})
      WHERE account_id = '${senderId}'
      RETURNING balance;
      
      UPDATE accounts
      SET balance = (balance + ${sendAmount})
      WHERE account_id = '${receiverID}'
      `
    const query3 = `
    INSERT INTO transactions (
      type, 
      sender_id, 
      recipient_id, 
      amount,
      date, 
      memo
    )
    values('transfer', '${senderId}', '${receiverID}', '${sendAmount}', NOW(), '${req.body.memo}')
    `
    db.query(query2, (err, response) => {
      console.log('Entered Second Query')
      if (err) {
        console.log(err);
        return next({
          log: 'Error in send middlewar',
          message: { err: 'Insufficient balance' }
        })
      }
      console.log('sent ', response[0].rows[0]),
        res.locals.sendBalance = response[0].rows[0].balance;
      db.query(query3, (err, response) => {
        if (err) console.log(err);
        return next();
      })
    })
  })

}



module.exports = transferController;