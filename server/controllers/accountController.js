const db = require('../models/bankModel');
const fetch = require('node-fetch');
const accountController = {};

//get user info from google
accountController.getUserInfo = async (req, res, next) => {
  console.log('trying to get user info from google');
  const access_token = req.headers.access_code;
  res.user = {};

  const fetchResult = await fetch(`https://openidconnect.googleapis.com/v1/userinfo?access_token=${access_token}`, {
    method: 'get',
  })
  const fetchJson = await fetchResult.json();
  console.log('successfully got user info');
  res.user.sub = fetchJson.sub;
  res.user.name = fetchJson.name;
  res.user.email = fetchJson.email;

  return next();
}

accountController.checkDB = async (req, res, next) => {
  res.user.foundUser = false;
  console.log('checking database for user')
  // const values = [google_id];
  const query = `
  SELECT account_id from users
  WHERE google_id = '${res.user.sub}'
  `
  db.query(query)
    .then(response => {
      if (response.rows.length !== 0) {
        console.log('User Exists: ', response.rows[0])
        res.user.foundUser = true;
        console.log('Response from DB in checkDB', response.rows[0])
        res.user.account_id = response.rows[0].account_id;
        return next();
      }
      return next();
    })
    .catch(e => console.log(e))
}

accountController.createUser = async (req, res, next) => {
  console.log('res.user.foundUser in createUser: ', res.user.foundUser)
  if (res.user.foundUser === true) {
    console.log('found user is true in createUser')
    return next();
  }
  console.log('made it to create user');
  const query = `
    INSERT INTO users (
      google_id, 
      name, 
      email
    )
    VALUES ('${res.user.sub}', '${res.user.name}', '${res.user.email}')
    RETURNING account_id
  `
  await db.query(query, (err, response) => {
    if (err) {
      console.log(err)
    }
    res.user.account_id = response.rows[0].account_id;
    console.log('RETURNED NEW USER', response.rows)
    return next();
  })

  // return next();

}

// account creation
accountController.createAccount = async (req, res, next) => {
  console.log('res.user.foundUser in createAccount: ', res.user.foundUser)
  if (res.user.foundUser === true) {
    console.log('found user is true in createAccount')
    return next();
  }
  console.log('made it to createAccount');
  const query = `
    INSERT INTO accounts (
      account_id, 
      date_opened, 
      balance,
      history
    )
    VALUES ('${res.user.account_id}', NOW(), 0,  '')
  `
  await db.query(query, (err, response) => {
    if (err) {
      console.log(err)
    }
    console.log('RETURNED NEW USER', response.rows)
    return next();
  })


}


// view balance
accountController.viewBalance = (req, res, next) => {
  res.cookie('log', res.user.account_id, { maxAge: 30000 })
  const query = `
  SELECT balance
  FROM accounts
  WHERE account_id = '${res.user.account_id}'
  `
  db.query(query, (err, response) => {
    if (err) {
      return next({
        log: 'Error in getting balance middleware',
        message: { err: 'Error occured in viewBalance account.Controller' }
      })
    }
    console.log('BALANCE', response.rows[0].balance);
    res.user.balance = response.rows[0].balance;
    console.log('USER: ', res.user)
    return next();
  })
}
// deposit money
accountController.depositBalance = (req, res, next) => {
  console.log('Made it to deposit balance');
  console.log('Request body in depositBalance: ', req.body);

  const query = `
  UPDATE accounts
  SET balance = (balance + ${req.body.deposit_amount})
  WHERE account_id = '${req.body.account_id}'
  RETURNING balance;
  `
  const query2 = `
  INSERT INTO transactions (
    type, 
    sender_id, 
    amount, 
    date, 
    memo
  )
  VALUES ('deposit', '${req.body.account_id}', '${req.body.deposit_amount}', NOW(), '${req.body.memo}');
  `

  db.query(query, (err, response) => {
    if (err) {
      console.log(err)
      return next({
        log: 'Error in deposit middleware',
        message: { err: 'Error occured in the depositBalance account.Controller' }
      })
    }
    console.log('deposit balance: ', response.rows[0]);
    res.locals.depositBalance = response.rows[0];
    db.query(query2, (err, response) => {
      if (err) {
        console.log(err)
      }
      return next();
    })
  })
}

// withdraw money
accountController.withdrawBalance = (req, res, next) => {
  const query = `
  UPDATE accounts
  SET balance = (balance - ${req.body.withdraw_amount})
  WHERE account_id = '${req.body.account_id}'
  RETURNING balance
  `
  const query2 = `
  INSERT INTO transactions (
    type, 
    sender_id, 
    amount, 
    date, 
    memo
  )
  VALUES ('withdraw', '${req.body.account_id}', '${req.body.withdraw_amount}', NOW(), '${req.body.memo}');
  `

  db.query(query, (err, response) => {
    if (err) {
      console.log(err)
      return next({
        log: 'Error in withdraw middleware',
        message: { err: ' You broke!' }
      })
    }
    console.log('withdraw balance: ', response.rows[0]);
    res.locals.withdrawBalance = response.rows[0];
    db.query(query2, (err, response) => {
      if (err) {
        console.log(err)
      }
      return next();
    })
  })
}


module.exports = accountController;