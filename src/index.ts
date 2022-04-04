import express from 'express';
import path from 'path';
import routes from './routes';

const app = express();
const port = 3000;

// static files
app.use(express.static('public'));

// Set Templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(routes);

app.listen(port, () => {
  console.log(`Timezones by location application is running on port ${port}.`);
});
