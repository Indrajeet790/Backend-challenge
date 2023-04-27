const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// require database connection
require("./config/dbConnection").connect();
// require route file
const authRouter = require("./routes/authRoutes");

const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 8000;

// middleware for body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
// authRoutes
app.use("/api/user", authRouter);

app.listen(PORT, (err) => {
  if (err) {
    console.log("error");
  } else {
    console.log(`Server is running at ${PORT}`);
  }
});
