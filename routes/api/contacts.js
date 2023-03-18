const express = require("express");
const { auth } = require("../../middlewares/auth");
const {
  addContactValidation,
  updateContactValidation,
  updateFavoriteValidation,
} = require("../../middlewares/validationContacts");

const {
  getContacts,
  getById,
  addNewContact,
  eraseContact,
  editContact,
  updateFavorite,
} = require("../../controllers/contactsController");

const router = express.Router();

router.get("/", auth, getContacts);

router.get("/:contactId", auth, getById);

router.post("/", auth, addContactValidation, addNewContact);

router.delete("/:contactId", auth, eraseContact);

router.put("/:contactId", auth, updateContactValidation, editContact);

router.patch(
  "/:contactId/favorite",
  auth,
  updateFavoriteValidation,
  updateFavorite
);

module.exports = router;
