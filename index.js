const config = require("./lib/config");
const express = require('express');
const { dbQuery } = require("./lib/db-query");
const { generateURL } = require("./lib/generate-url")

const app = express();
const port = config.PORT;
const host = config.HOST;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
  let constrURL = generateURL()
  let sqlResp = await dbQuery("INSERT INTO urls (url) VALUES ($1) RETURNING url;", `${constrURL}`);
  //need to handle possibility of error raised from nonunique url being added
  res.send(sqlResp.rows[0].url)
})

app.get('/display', async (req, res) => {
  let contents = await dbQuery("SELECT * FROM requests;")
  res.send(contents.rows)
})

//store request information
app.all('/*', async (req, res) => {
  let path = req.path.slice(1);
  let resp = await dbQuery("SELECT * FROM urls WHERE url = ($1);", `${path}`)
  //every request includes a query where path='favicon.ico'
  
  if (resp.rowCount > 0) {
    res.send(await dbQuery("INSERT INTO requests(url, header, body) VALUES($1, $2, $3) RETURNING (header, body);", `${path}`, JSON.stringify(req.headers), JSON.stringify(req.body)))
  }
  res.send('No such bin')
})

//path to display all data for a given url

app.listen(port, () => {
  console.log(`listening on port ${port}`);
})