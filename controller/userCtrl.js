const User = require("../models/userModel");
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
      message: "user Already exists",
      success: false,
    });
  }
};

module.exports = { createUser };
