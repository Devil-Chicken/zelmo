const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;
const accountController = require('./controllers/accountController');
const transferController = require('./controllers/transferController');
const fetch = require('node-fetch');
const dotenv = require('dotenv');

dotenv.config();

const AccessKey = process.env.ACCESS_KEY;
const SecretKey = process.env.SECRET_KEY;


// app.use(express.json());


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

app.get('/google', async (req, res) => {
  console.log(req.headers.access_code)
  console.log('trying to get user info');
  const access_token = req.headers.access_code;
  res.user = {};

  const fetchResult = await fetch(`https://openidconnect.googleapis.com/v1/userinfo?access_token=${access_token}`, {
    method: 'get',
  })
  const fetchJson = await fetchResult.json();
  console.log('successfully got user info');
  console.log(fetchJson);
  // res.user.id = fetchJson.sub;

  // return res.status(200).send(JSON.stringify(res.user));
})

app.get('/dashboardContainer', (req, res) => {
  res.redirect('http://localhost:8080/dashboard')
})

app.get('/balance', accountController.viewBalance, (req, res) => {
  console.log('Hit the balance end point');
  res.status(200).json(res.locals.viewBalance);
})

app.post('/deposit', accountController.depositBalance, (req, res) => {
  console.log('Successful deposit');
  res.status(200).json(res.locals.depositBalance);
})

app.post('/withdraw', accountController.withdrawBalance, (req, res) => {
  console.log('Successful withdraw');
  res.status(200).json(res.locals.withdrawBalance);
})

app.post('/send', transferController.sendMoney, (req, res) => {
  console.log('Successfully sent');
  res.status(200).json(res.locals.sendBalance)
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