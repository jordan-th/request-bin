const express = require('express');
const app = express();
const PORT = 3002;

app.get('/', (req, res) => {
  res.send('render homepage')
})

app.all('/*', (req, res) => {
  console.log(`Headers: ${req.headers}`);
  //console.log(`Body: ${req.body}`);
  res.send(`add to bucket`);
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
})