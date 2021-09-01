const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;
const accountController = require('./controllers/accountController');
const transferController = require('./controllers/transferController');
// ADDING TRANSACTION CONTROLLER
const transactionController = require('./controllers/transactionController');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
const session = require('express-session');

dotenv.config();

const AccessKey = process.env.ACCESS_KEY;
const SecretKey = process.env.SECRET_KEY;

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || 'default_session_secret',
  resave: false,
  saveUnintialized: false,
}));

app.get('/oauth', (req, res) => {
  console.log('made it to oauth route');
  console.log('AccessKey: ', AccessKey);
  try {
    const googleUrl = `https://accounts.google.com/o/oauth2/v2/auth?scope=openid%20profile%20email&response_type=token&redirect_uri=http://localhost:8080&client_id=${AccessKey}`;
    res.redirect(googleUrl);
    console.log('redirected');
  }
  catch (e) {
    console.log(e)
  }
})

app.get('/google', accountController.getUserInfo,
  accountController.checkDB,
  accountController.createUser,
  accountController.createAccount,
  accountController.viewBalance,
  async (req, res) => {
    console.log('made it out of google route')
    return res.status(200).send(JSON.stringify({
      name: res.user.name,
      email: res.user.email,
      account_id: res.user.account_id,
      balance: res.user.balance
    }))
    // if (res.user.foundUser === false) {
    //   console.log('did not find user, going to create user')
    //   res.redirect('/createUser');
    // } else {
    //   console.log('user already exists')
    // }
  })

app.get('/dashboardContainer', (req, res) => {
  res.redirect('http://localhost:8080/dashboard')
})

app.get('/balance', accountController.viewBalance, (req, res) => {
  console.log('Hit the balance end point');
  res.status(200).json(res.locals.viewBalance);
})

app.post('/depositAmount', accountController.depositBalance, (req, res) => {
  console.log('Successful deposit');
  res.status(200).json(res.locals.depositBalance);
})

app.post('/withdrawAmount', accountController.withdrawBalance, (req, res) => {
  console.log('Successful withdraw');
  res.status(200).json(res.locals.withdrawBalance);
})

app.post('/send', transferController.sendMoney, (req, res) => {
  console.log('Successfully sent');
  res.status(200).json(res.locals.sendBalance)
})

// TRANSACTION HISTORY GET REQUEST
app.get('/transactionHistory', transactionController.viewTransactions, (req, res) => {
  console.log('Successfully pulled transactions')
  res.status(200).json(res.locals.transactions)
})

// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.status(404).send('Page not Found'));

//global err handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});


app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});