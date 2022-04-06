import express from 'express';
import fs from 'fs';
import https from 'https';
import path from 'path';
import routes from './routes';

const app = express();
const port = 3000;
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
httpsServer.listen(port);

// app.listen(port, () => {
//   console.log(`Timezones by location application is running on port ${port}.`);
// });
