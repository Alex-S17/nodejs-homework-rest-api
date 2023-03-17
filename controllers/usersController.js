// const { Conflict } = require("http-errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../models/userModel");
require("dotenv").config();
const SECRET_WORD = process.env.SECRET_WORD;

const registerNewUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(409).json({
      message: "Email in use",
    });
    // throw new Conflict("Email in use");
  }

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  const result = User.create({ email, password: hashPassword });
  res.status(201).json({
    user: {
      email: email,
      subscription: "starter",
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
  const token = jwt.sign(payload, SECRET_WORD); // ДОБАВИТЬ СРОК ДЕЙСТВИЯ ТОКЕНА

  return res.status(200).json({
    token: token,
    user: {
      email: user.email,
      subscription: "starter", // Это потом надо будет изменить при доп.задании
    },
  });
};

const getCurrent = async (req, res) => {};

module.exports = {
  registerNewUser,
  login,
  getCurrent,
};
