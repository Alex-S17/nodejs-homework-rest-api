const { User } = require("../models/userModel");

const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const registerNewUser = async (
  email,
  hashPassword,
  avatarURL,
  verificationToken
) => {
  try {
    return await User.create({
      email,
      password: hashPassword,
      avatarURL,
      verificationToken,
    });
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

const updateUserAvatar = async (
  avatarsDir,
  newAvatarName,
  avatarURL,
  tempUpload,
  _id
) => {
  try {
    const resultUpload = path.join(avatarsDir, newAvatarName);
    await fs.rename(tempUpload, resultUpload);
    Jimp.read(resultUpload)
      .then((image) => {
        return image.resize(250, 250).write(resultUpload);
      })
      .catch((err) => console.log(err));
    await User.findByIdAndUpdate(_id, { avatarURL });
    return 200;
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = {
  registerNewUser,
  loginUser,
  logoutUser,
  updateUserSubscription,
  updateUserAvatar,
};
