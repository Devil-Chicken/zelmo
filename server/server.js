const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;
const accountController = require('./controllers/accountController');
const transferController = require('./controllers/transferController');

// app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello?');
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