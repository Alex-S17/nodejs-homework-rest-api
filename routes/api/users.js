const express = require("express");

const {
  userValidation,
  userMailValidation,
} = require("../../middlewares/validationUsers");

const { auth } = require("../../middlewares/auth");
const { upload } = require("../../middlewares/upload");

const {
  register,
  verifyEmail,
  repeatVerifyEmail,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
} = require("../../controllers/usersController");

const router = express.Router();

router.post("/register", userValidation, register);
router.post("/login", userValidation, login);
router.post("/current", auth, getCurrent);
router.post("/logout", auth, logout);
router.patch("/", auth, updateSubscription);
router.patch("/avatars", auth, upload.single("avatar"), updateAvatar);
router.get("/verify/:verificationToken", verifyEmail);
router.post("/verify", userMailValidation, repeatVerifyEmail);

module.exports = router;
