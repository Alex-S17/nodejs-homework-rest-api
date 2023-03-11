const express = require("express");
const {
  addContactValidation,
  updateContactValidation,
  updateFavoriteValidation,
} = require("../../middlewares/validationContacts");

const router = express.Router();

const {
  getContacts,
  getById,
  addNewContact,
  eraseContact,
  editContact,
  updateFavorite,
} = require("../../controllers/contactsController");

router.get("/", getContacts);

router.get("/:contactId", getById);

router.post("/", addContactValidation, addNewContact);

router.delete("/:contactId", eraseContact);

router.put("/:contactId", updateContactValidation, editContact);

router.patch("/:contactId/favorite", updateFavoriteValidation, updateFavorite);

module.exports = router;
