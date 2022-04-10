import express from 'express';
import fs from 'fs';
import https from 'https';
import path from 'path';
import routes from './routes';

const app = express();
const HTTPS_PORT = 443;
// const HTTP_PORT = 8080;
const privateKey = fs.readFileSync('key.pem');
const certificate = fs.readFileSync('cert.pem');
const credentials = { key: privateKey, cert: certificate };

// static files
app.use(express.static('public'));

// Set Templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(routes);

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(HTTPS_PORT, () => {
  console.log(`Application is running on port ${HTTPS_PORT}.`);
});

// app.listen(HTTP_PORT, () => {
//   console.log(`Application is running on port ${HTTP_PORT}.`);
// });
