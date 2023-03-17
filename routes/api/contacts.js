const express = require("express");
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

router.get("/", getContacts);

router.get("/:contactId", getById);

router.post("/", addContactValidation, addNewContact);

router.delete("/:contactId", eraseContact);

router.put("/:contactId", updateContactValidation, editContact);

router.patch("/:contactId/favorite", updateFavoriteValidation, updateFavorite);

module.exports = router;
