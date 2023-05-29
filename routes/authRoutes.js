const express = require("express");
const {
  createUser,
  loginUserCtrl,
  getallUser,
  getaUser,
  deleteUser,
  updateUser,
} = require("../controller/userCtrl");
const router = express.Router();
createUser;

const { authMiddleware } = require("../Middleware/authMiddleware");

// route for create  a new user
router.post("/register", createUser);

// login route
router.post("/login", loginUserCtrl);

// route for gelAllUsers
router.get("/all-users", getallUser);

// get a single user
router.get("/:id", authMiddleware, getaUser);

// delete route for a user
router.delete("/:id", deleteUser);

// update a user details
router.put("/:id", updateUser);

module.exports = router;
