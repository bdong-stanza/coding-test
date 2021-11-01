const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const { sharksList, catsList } = require('./constants/image');
const { shuffle } = require('./utility/shuffle');

const app = express();
const port = process.env.PORT || 5000;
const DIST_DIR = path.resolve(__dirname, '../server/dist');
const allowedOrigins = ['http://localhost:5000', 'http://localhost:5050'];

app.use(express.static(DIST_DIR));
// adding Helmet to enhance your API's security
app.use(helmet());

// adding morgan to log HTTP requests
app.use(morgan('combined'));
app.use(cors({
  origin: (origin, callback) => {
    if(!origin) {
      return callback(null, true);
    }
    if(!allowedOrigins.includes(origin)) {
      const msg = 'This specified Origin doesn\'t get access because of the CORS policy for this site';
      return callback(new Error(msg), false); 
    }

    return callback(null, true);
  }
}));

app.get('/', (req, res) => {
  const HTML_FILE = path.join(DIST_DIR, 'index.html');
  res.sendFile(HTML_FILE);
});

app.get('/api/:animalType', (req, res) => {

  res.set('Cache-control', 'no-cache');

  switch(req.params.animalType) {
    case 'images':
      res.send(shuffle([...sharksList, ...catsList]));
      break;
    case 'sharks':
      res.send(sharksList);
      break;
    case 'cats':
      res.send(catsList);
      break
    default:
      return;
  }
})

app.listen(port, () => console.log(`Listening on port ${port}`));