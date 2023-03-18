const { User } = require("../models/userModel");

const registerNewUser = async (email, hashPassword) => {
  try {
    return await User.create({ email, password: hashPassword });
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (userId, token) => {
  try {
    return await User.findByIdAndUpdate(userId, { token });
  } catch (error) {
    console.log(error);
  }
};

const logoutUser = async (_id) => {
  try {
    return await User.findByIdAndUpdate(_id, { token: null });
  } catch (error) {
    console.log(error);
  }
};

const updateUserSubscription = async (_id, subscription) => {
  try {
    return await User.findByIdAndUpdate(
      _id,
      { $set: { subscription } },
      { returnDocument: "after" }
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  registerNewUser,
  loginUser,
  logoutUser,
  updateUserSubscription,
};
