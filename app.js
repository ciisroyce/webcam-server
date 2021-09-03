'use strict';

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '/index.html'));
});

app.get('/.well-known/apple-app-site-association', (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.status(200).send(fs.readFileSync('./.well-known/apple-app-site-association', {encoding: 'utf-8'})).end();
  res.redirect('/v1/api/token')
});

app.get('/get-token', (req, res) => {
  // TODO: We would go through the login process with the Canon subscription server here

  // The following redirect will redirect back to our Mac application using universal links
  res.redirect('/v1/api/token/simulate_success')
});

app.get('/v1/api/token/simulate_success', (req, res) => {
  res.status(200).send('<h2>Oops!</h2>We were redirected here via a <i>Location</i> header.<br>This URL should have been captured by our native application using universal links.').end();
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

module.exports = app;
