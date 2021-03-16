require('dotenv').config();

const express = require("express");
require('express-async-errors');
const bodyParser = require("body-parser");
const cors = require("cors");
const { auth, boards } = require('./api/routes');
const { connectToDB } = require('./database');
const db = require('./api/models');

const app = express();
const PORT = process.env.PORT || 8080;

const { errorHandlerMiddleware } = require('./api/middleware/errorHandlerMiddleware');


app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

connectToDB();

app.get("/", (req, res) => {
  res.json({ message: "Hello world!" });
});

app.use('/api', auth);
app.use('/api/boards', boards);
app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

process.on('SIGINT', () => {
  db.sequelize.connectionManager.close();
  app.close();
});

