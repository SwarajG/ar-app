import express from 'express';
import fs from 'fs';
import http from 'http';
import https from 'https';
import path from 'path';
import routes from './routes';

const app = express();
const HTTPS_PORT = process.env.PORT || 3000;
const HTTP_PORT = process.env.PORT || 8080;
const privateKey = fs.readFileSync('key.pem');
const certificate = fs.readFileSync('cert.pem');
const credentials = { key: privateKey, cert: certificate };

// static files
app.use(express.static('public'));

// Set Templating engine
console.log(path.join(__dirname, '../src/views/'));
// app.set('views', path.join(__dirname, 'views'));
app.set('views', path.join(__dirname, '../src/views/'));
app.set('view engine', 'ejs');

app.use(routes);

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(HTTPS_PORT, () => {
  console.log(`HTTPS Application is running on port ${HTTPS_PORT}.`);
});

httpServer.listen(HTTP_PORT, () => {
  console.log(`HTTP Application is running on port ${HTTP_PORT}.`);
});
