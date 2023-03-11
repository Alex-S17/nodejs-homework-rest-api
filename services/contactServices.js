const { Contact } = require("../models/contactModel");

const listContacts = async () => {
  try {
    return await Contact.find();
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    return await Contact.findById(contactId);
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    return await Contact.findByIdAndRemove(contactId);
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (body) => {
  try {
    const { name, email, phone, favorite } = body;
    return await Contact.create({ name, email, phone, favorite });
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const { name, email, phone, favorite } = body;
    return await Contact.findByIdAndUpdate(contactId, {
      $set: { name, email, phone, favorite },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateStatusContact = async (contactId, body) => {
  try {
    const favorite = body.favorite;
    return await Contact.findByIdAndUpdate(contactId, {
      $set: { favorite },
    });
  } catch (error) {}
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
