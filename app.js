'use strict';

const express = require('express');
var fs = require('fs');

const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Welcome to the Webcam Subscription Server').end();
});

app.get('/.well-known/apple-app-site-association', (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.status(200).send(fs.readFileSync('./.well-known/apple-app-site-association', {encoding: 'utf-8'})).end();
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

module.exports = app;
