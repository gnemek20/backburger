const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('BackBurger! Server :)');
})

app.listen(3000);

module.exports = app;