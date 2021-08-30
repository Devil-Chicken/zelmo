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
  await db.query(query, (err, response) => {
    if (err) {
      console.log('err from checkDB:', err);
    } else {
      if (response.rows.length !== 0) {
        res.user.foundUser = true;
        console.log('Response from DB in checkDB', response.rows[0])
        res.user.accountID = response.rows[0]

      }
    }


  })
  console.log('res.user.foundUser: ', res.user.foundUser)
  return next();
}

accountController.createUser = async (req, res, next) => {
  console.log('res.user.foundUser in createUser: ', res.user.foundUser)
  if (res.user.foundUser === true) {
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
  `
  await db.query(query, (err, response) => {
    if (err) {
      console.log(err)
    }
    console.log('RETURNED NEW USER', response.rows)
  })

  return next();


}


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