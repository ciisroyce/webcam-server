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
  // We will go through the login process with the Canon subscription server here, which will
  // redirect back to our Mac application using universal links, after successful authentication.
  res.redirect('https://ccb-dev.com/canonid/#/login?client_id=a560247f-c16c-43cb-8ce1-aa466395df7d&redirect_uri=https:%2F%2Feos-webcam-dev.wl.r.appspot.com%2Fwebcam%2Fauthtoken&rd=1&scope=openid&response_type=id_token&nonce=some_value')
});

app.get('/webcam/authtoken', (req, res) => {
  // TODO: This URL should probably be /v1/api/token or webcam/v1/api/token
  // Successful login at Canon Global ID redirects back to this URL.
  // The authorization code is attached to the redirect URL as a fragment.

  // The following redirect will eventually redirect back to our Mac application using universal links
  // For now, it just comes back to this server to emulate the behavior and test the authorization flow.
  res.redirect('/v1/api/token/simulate_success')
});

app.get('/v1/api/token/simulate_success', (req, res) => {
  res.status(200).sendFile('simulate_success.html', { root: '.' });
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

module.exports = app;
