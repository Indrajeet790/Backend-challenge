const { generateToken } = require("../config/jwtToken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
// find user if already register if not register then  create a newUser
const createUser = async (req, resp) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    // create a new user
    const newUser = await User.create(req.body);
    resp.json(newUser);
  } else {
    throw new Error("user already Exists");
  }
};
// login using email and password
const loginUserCtrl = asyncHandler(async (req, resp) => {
  const { email, password } = req.body;
  // console.log(email, password);
  // check if user is already exists or not
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    // resp.json(findUser);
    resp.json({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser._id),
    });
  } else {
    resp.json({
      message: "Invalid user",
    });
  }
});

module.exports = { createUser, loginUserCtrl };
