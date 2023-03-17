const express = require("express");

const { registerUserValidation } = require("../../middlewares/validationUsers");
const {
  registerNewUser,
  login,
  getCurrent,
} = require("../../controllers/usersController");

const router = express.Router();

router.post("/register", registerUserValidation, registerNewUser); // ПЕРЕИМЕНОВАТЬ
router.post("/login", registerUserValidation, login);
router.get("/current", getCurrent);

module.exports = router;
