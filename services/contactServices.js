const { Contact } = require("../models/contactModel");

const listContacts = async (_id, skip, limit, favorite) => {
  try {
    if (favorite === "true" || favorite === "false") {
      return await Contact.find({ owner: _id, favorite }, "", {
        skip,
        limit: Number(limit),
      }).populate("owner", "_id email subscription");
    }
    return await Contact.find({ owner: _id }, "", {
      skip,
      limit: Number(limit),
    }).populate("owner", "_id email subscription");
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (ownerId, contactId) => {
  try {
    return await Contact.findOne({ _id: contactId, owner: ownerId });
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (ownerId, contactId) => {
  try {
    return await Contact.findOneAndRemove({ _id: contactId, owner: ownerId });
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (body, _id) => {
  try {
    const { name, email, phone, favorite } = body;
    return await Contact.create({ name, email, phone, favorite, owner: _id });
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (ownerId, contactId, body) => {
  try {
    const { name, email, phone, favorite } = body;
    return await Contact.findOneAndUpdate(
      { _id: contactId, owner: ownerId },
      {
        $set: { name, email, phone, favorite },
      },
      { returnDocument: "after" }
    );
  } catch (error) {
    console.log(error);
  }
};

const updateStatusContact = async (ownerId, contactId, favorite) => {
  try {
    return await Contact.findOneAndUpdate(
      { _id: contactId, owner: ownerId },
      {
        $set: { favorite },
      },
      { returnDocument: "after" }
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
