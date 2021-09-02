const db = require('../models/bankModel');
const fetch = require('node-fetch');
const cookieController = {};
const accountController = {};

//get user info from google


cookieController.checkDB = async (req, res, next) => {
  console.log(req.headers)
  if (!req.headers.cookie.includes('log')) {
    console.log('Cookie Monster!')
    res.locals.isloggedOn = false;
    //return next();
  }
  let testcookie = req.headers.cookie.split(';')[1].split('=')[1];
  console.log('Middleware cookie', testcookie)
  if (testcookie.length === 0) {
    console.log('entered here');
    return next();
  }
  // const values = [google_id];
  const query = `
  SELECT name from users
  WHERE account_id = '${testcookie}'
  `
  const query2 = `
  SELECT balance from accounts
  WHERE account_id = '${testcookie}'
  `
  db.query(query)
    .then(response => {
      console.log('Response', response)
      if (response.rows.length !== 0) {
        console.log('User Exists: ', response.rows[0])
        res.locals.foundUser = true;
        console.log('Response from DB in checkDB', response.rows[0])
        res.locals.account_id = testcookie;
        res.locals.name = response.rows[0].name
        db.query(query2, (err, response1) => {
          res.locals.balance = response1.rows[0].balance;
          return next();
        })
      }
      // return next();
    })
    .catch(e => console.log(e))
}





module.exports = cookieController;