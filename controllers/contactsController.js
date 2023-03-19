const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../services/contactServices");

const getContacts = async (req, res) => {
  const { _id } = req.user;
  const { page, limit, favorite } = req.query;
  const skip = (page - 1) * limit;

  const listOfContacts = await listContacts(_id, skip, limit, favorite);
  res.status(200).json({
    status: "200",
    listOfContacts,
  });
};

const getById = async (req, res) => {
  const { _id } = req.user;
  const contactId = req.params.contactId;
  const contactById = await getContactById(_id, contactId);
  if (!contactById) {
    return res.status(404).json({
      status: "404",
      message: "Not found",
    });
  }
  return res.status(200).json({
    status: "200",
    contactById,
  });
};

const addNewContact = async (req, res, next) => {
  const { _id } = req.user;
  const { name, email, phone } = req.body;
  if (!name || !email || !phone)
    return res.status(400).json({
      status: "400",
      message: "missing some of required fields",
    });
  const newContact = { ...req.body };
  if (!newContact.favorite) {
    newContact.favorite = false;
  }
  await addContact(newContact, _id);
  res.status(201).json({
    status: "201",
    newContact,
  });
};

const eraseContact = async (req, res, next) => {
  const { _id } = req.user;
  const contactId = req.params.contactId;
  const result = await removeContact(_id, contactId);
  if (!result) {
    return res.status(404).json({
      status: "404",
      message: "Not found",
    });
  }
  return res.status(200).json({
    status: "200",
    message: "contact deleted",
  });
};

const editContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  if (!name && !email && !phone)
    return res.status(400).json({
      status: "400",
      message: "missing fields",
    });
  const { _id } = req.user;
  const contactId = req.params.contactId;
  const result = await updateContact(_id, contactId, req.body);
  if (!result) {
    return res.status(404).json({
      status: "404",
      message: "Not found",
    });
  }
  return res.status(200).json({
    status: "200",
    result,
  });
};

const updateFavorite = async (req, res, next) => {
  if (!req.body && !req.body.favorite)
    return res.status(400).json({
      status: "400",
      message: "missing field favorite",
    });
  const { _id } = req.user;
  const contactId = req.params.contactId;
  const result = await updateStatusContact(_id, contactId, req.body.favorite);
  if (!result) {
    return res.status(404).json({
      status: "404",
      message: "Not found",
    });
  }
  return res.status(200).json({
    status: "200",
    result,
  });
};

module.exports = {
  getContacts,
  getById,
  addNewContact,
  eraseContact,
  editContact,
  updateFavorite,
};
