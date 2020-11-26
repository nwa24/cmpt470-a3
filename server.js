const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { Sequelize } = require('sequelize');

const indexRouter = require('./routes/index');
const rectangleRouter = require('./routes/rectangles');
const dbConfig = require('./config/db_config');

const PORT = process.env.port || 80;
const app = express();

app.use(morgan('dev'));
// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public'))); // serves resources from public folder

app.use('/', indexRouter);
app.use('/rectangles', rectangleRouter);

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to database successful.');
  })
  .catch((err) => {
    console.log('ERROR - Unable to connect to the database: ', err);
  });

app.listen(PORT, function () {
  console.log(`Listening on ${PORT}`);
});
