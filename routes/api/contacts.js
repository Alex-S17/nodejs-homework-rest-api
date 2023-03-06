const express = require("express");
const {
  addContactValidation,
  updateContactValidation,
} = require("../../middlewares/validationContacts");

const router = express.Router();

const {
  getContacts,
  getById,
  addNewContact,
  eraseContact,
  editContact,
} = require("../../controllers/contactsController");

router.get("/", getContacts);

router.get("/:contactId", getById);

router.post("/", addContactValidation, addNewContact);

router.delete("/:contactId", eraseContact);

router.put("/:contactId", updateContactValidation, editContact);

module.exports = router;
