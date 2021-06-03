const express = require('express');
const app = express();
const PORT = 3002;

app.get('/', (req, res) => {
  res.send('render homepage')
})

app.all('/*', (req, res) => {
  console.log(req);
  res.send('add to bucket')
})

