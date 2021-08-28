const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;

// app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello?');
})

app.get('/dashboardContainer', (req, res) => {
  res.redirect('http://localhost:8080/dashboard')
})





app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});