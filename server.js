const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const indexRouter = require('./routes/index');
const rectangleRouter = require('./routes/rectangles');

const PORT = process.env.port || 5000;
const app = express();

app.use(morgan('dev'));
// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public'))); // serves resources from public folder

app.use('/', indexRouter);
app.use('/rectangles', rectangleRouter);

app.listen(PORT, function () {
  console.log(`Listening on ${PORT}`);
});
