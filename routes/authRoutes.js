const express = require("express");
const { createUser, loginUserCtrl } = require("../controller/userCtrl");
const router = express.Router();
createUser;

// route for create  a new user
router.post("/register", createUser);

// login route
router.post("/login", loginUserCtrl);

module.exports = router;
