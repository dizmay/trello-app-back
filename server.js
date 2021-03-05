require('dotenv').config();

const express = require("express");
require('express-async-errors');
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

const { errorHandlerMiddleware } = require('./api/middleware/errorHandlerMiddleware');

const corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./api/models");
db.sequelize.sync({ force: false }).then(() => {
  console.log('Done');
});

app.get("/", (req, res) => {
  res.json({ message: "Hello world!" });
});


require("./api/routes/users.routes")(app);
app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
