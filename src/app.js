const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const mainRoutes = require("../src/routes/index");
const passport = require("passport");

dotenv.config();

const app = express();

app.use(passport.initialize());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(mainRoutes);

app.listen(3000, () => {
  console.log("server running");
});
