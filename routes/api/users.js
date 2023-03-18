const express = require("express");

const { userValidation } = require("../../middlewares/validationUsers");
const { auth } = require("../../middlewares/auth");
const {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
} = require("../../controllers/usersController");

const router = express.Router();

router.post("/register", userValidation, register); // ПЕРЕИМЕНОВАТЬ
router.post("/login", userValidation, login);
router.post("/current", auth, getCurrent);
router.post("/logout", auth, logout);
router.patch("/", auth, updateSubscription);

module.exports = router;
