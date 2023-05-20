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
    resp.json({
      message: "user already exists",
    });
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

// update a user
const updateUser = asyncHandler(async (req, resp) => {
  const { id } = req.params;
  const updateUser = await User.findByIdAndUpdate(
    id,
    {
      firstname: req?.body?.firstname,
      lastname: req?.body?.lastname,
      email: req?.body?.email,
      mobile: req?.body?.mobile,
    },
    {
      new: true,
    }
  );
  resp.json(updateUser);
});

//  get all users
const getallUser = asyncHandler(async (req, resp) => {
  try {
    const getUsers = await User.find();
    resp.json(getUsers);
  } catch (error) {
    resp.json({
      message: "error",
    });
  }
});

// if you get a single user
const getaUser = asyncHandler(async (req, resp) => {
  const { id } = req.params;
  // console.log(id);
  try {
    const getaUser = await User.findById(id);
    resp.json({ getaUser });
  } catch (error) {
    resp.json({
      message: "invalid id",
    });
  }
});

// how to delete a user
const deleteUser = asyncHandler(async (req, resp) => {
  const { id } = req.params;
  try {
    const deleteUser = await User.findByIdAndDelete(id);
    resp.json({
      deleteUser,
    });
  } catch (error) {
    resp.json({
      message: "error while deletion",
    });
  }
});

module.exports = {
  createUser,
  loginUserCtrl,
  getallUser,
  getaUser,
  deleteUser,
  updateUser,
};
