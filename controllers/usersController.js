const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const { User } = require("../models/userModel");
const path = require("path");
// const fs = require("fs/promises");
// const Jimp = require("jimp");
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;
const SUBSCRIPTION = process.env.SUBSCRIPTION;

const {
  registerNewUser,
  loginUser,
  logoutUser,
  updateUserSubscription,
  updateUserAvatar,
} = require("../services/userServices");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(409).json({
      message: "Email in use",
    });
  }
  const avatarURL = gravatar.url(email);
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  await registerNewUser(email, hashPassword, avatarURL);
  res.status(201).json({
    user: {
      email: email,
      subscription: "starter",
      avatarURL: avatarURL,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({
      message: "Email or password is wrong",
    });
  }
  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" }); // СРОК ДЕЙСТВИЯ ТОКЕНА
  await loginUser(user._id, token);
  return res.status(200).json({
    token: token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const getCurrent = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }
  return res.status(200).json({
    email: req.user.email,
    subscription: req.user.subscription,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  const result = await logoutUser(_id);
  if (!result) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }
  return res.status(204).json();
};

const updateSubscription = async (req, res) => {
  const { subscription } = req.body;
  if (!req.body && !req.body.subscription)
    return res.status(400).json({
      status: "400",
      message: "missing field subscription",
    });
  if (!SUBSCRIPTION.includes(subscription)) {
    return res.status(400).json({
      status: "400",
      message: "invalid value of subscription field",
    });
  }
  const { _id } = req.user;
  const result = await updateUserSubscription(_id, subscription);
  if (!result) {
    return res.status(404).json({
      status: "404",
      message: "Not found",
    });
  }
  return res.status(200).json({
    status: "200",
    result,
  });
};

const updateAvatar = async (req, res) => {
  const avatarsDir = path.join(__dirname, "../", "public", "avatars");
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const newAvatarName = `${_id}${originalname}`;
  const avatarURL = path.join("avatars", newAvatarName);
  // const avatarURL = path.join("public", "avatars", newAvatarName);

  const result = await updateUserAvatar(
    avatarsDir,
    newAvatarName,
    avatarURL,
    tempUpload,
    _id
  );
  if (!result) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }
  return res.status(200).json({
    avatarURL,
  });
};

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
};
