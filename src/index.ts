import express from 'express';
import path from 'path';
import indexRoute from './routes';

const app = express();
const port = 3000;

// static files
app.use(express.static('public'));
app.use('css', express.static(path.join(__dirname, 'public/css')));
app.use('js', express.static(path.join(__dirname, 'public/js')));
app.use('img', express.static(path.join(__dirname, 'public/img')));

// Set Templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// App routes
app.use('/', indexRoute);

app.listen(port, () => {
  console.log(`Timezones by location application is running on port ${port}.`);
});
