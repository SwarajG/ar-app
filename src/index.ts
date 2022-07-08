import express from 'express';
import fs from 'fs';
import http from 'http';
import https from 'https';
import path from 'path';

import { connect } from "./database";
import routes from './routes';

connect();
const app = express();
const HTTPS_PORT = process.env.PORT || 443;
const HTTP_PORT = process.env.PORT || 8080;
const privateKey = fs.readFileSync('key.pem');
const certificate = fs.readFileSync('cert.pem');
const credentials = { key: privateKey, cert: certificate };

// static files
app.use(express.static('public'));

app.use(express.json());

// Set Templating engine
app.set('views', path.join(__dirname, '../src/views/'));
app.set('view engine', 'ejs');

app.use(routes);

if (process.env.NODE_ENV === 'production') {
  const httpServer = http.createServer(app);
  httpServer.listen(HTTP_PORT, () => {
    console.log(`HTTP Application is running on port ${HTTP_PORT}.`);
  });
} else {
  https.createServer(credentials, app).listen(HTTPS_PORT, () => {
    console.log(`HTTPS Application is running on port ${HTTPS_PORT}.`);
  });
}
