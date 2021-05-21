require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

const cors = require('cors');
const express = require('express');
// const morgan = require('morgan');
const path = require('path');

const database = require('./database');
const routes = require('./routes');

(async () => {
  try {
    await database.sync();
    // const resultado = await database.sync();
    // console.log(resultado);
  } catch (error) {
    // console.log(error);
  }
})();

const SAVE_PATH = path.resolve(__dirname, '..', 'tmp', 'uploads');

const app = express();
app.use(cors());
app.use('/files', express.static(SAVE_PATH));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(morgan('dev'));

app.use(routes);
app.listen(process.env.PORT);

module.exports = app;
