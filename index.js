const express = require("express");
const mongoose = require("mongoose");
require("./config/dbConnection").connect();
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 8000;

app.use("/", (req, resp) => {
  resp.send("Hello from server side");
});

app.listen(PORT, (err) => {
  if (err) {
    console.log("error");
  } else {
    console.log(`Server is running at ${PORT}`);
  }
});
