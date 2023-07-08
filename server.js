const express = require('express');
const app = express();
const dotenv = require('dotenv');

dotenv.config();
const { PORT } = process.env;

app.get('/', (req, res) => {
    res.send('Sanity Check');
  });

app.listen(PORT, ()=>{
    console.log("API listening on: " + PORT);
});